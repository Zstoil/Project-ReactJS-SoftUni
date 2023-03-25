import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import * as carService from '../../services/carService';


export const Details = () => {

    const { carId } = useParams();
    const [car, setCar] = useState({});

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

    return (
        <div className='details'>
            <h2>Car Details</h2>
            <div className="car-details">
                <div>
                    <img className="image-details" src={car.imageUrl} />
                </div>
                <p>Model:{car.model}</p>
                <p>Type:{car.type}</p>
                <p>Kilometers:{car.kilometers}km</p>
                <p>Price:{car.price}</p>
                <p>Description:{car.description}</p>
                <Link to={`/edit`} className="details-btn-edit">Edit</Link>
                <Link to={`/delete`} className="details-btn-del">Delete</Link>

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