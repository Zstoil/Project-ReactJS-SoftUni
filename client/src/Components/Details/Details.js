import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'

import {carServiceFactory} from '../../services/carService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../contexts/AuthContext';

export const Details = () => {

    const {userId} = useContext(AuthContext);
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState({});
    const carService = useService(carServiceFactory);

    useEffect(() => {
        carService.getOne(carId)
            .then(result => {
                setCar(result)
            })
    }, [carId]);


        // like button
    const [like, setLike] = useState(1),
          [isLike, setIsLike] = useState(false),
        onLikeButtonClick = () => {
            setLike(like + (isLike ? -1 : 1));
            setIsLike(!isLike);
        };
        const isOwner = car._ownerId === userId;
        
        const onDeleteClick = async () => {
            await carService.removeCar(car._id);
    
            // TODO: delete from state
    
            navigate('/catalog');
        };

    return (
        <div className='details'>
            <h2>Car Details</h2>
            <div className="car-details">
                <div>
                    <img className="image-details" src={car.imageUrl} />
                </div>
                <p>Model:{car.model}</p>
                <p>Type:{car.type}</p>
                <p>Kilometers:{car.kilometers} km</p>
                <p>Price:{car.price} &#x20AC;</p>
                <p>Description:{car.description}</p>
                {isOwner && (
                    <div>
                    <Link to={`/edit`} className="details-btn-edit">Edit</Link>
                    <button className="details-btn-del" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
                

                {/* like button */}
                <button
                    className={"like-button " + (isLike ? "liked" : "")}
                    onClick={onLikeButtonClick}
                >
                    {"Like"}  {like}
                </button>
            </div>
        </div>
    );
}