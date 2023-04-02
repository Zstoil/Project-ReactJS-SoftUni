import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'

import * as carService from '../../services/carService';
import { AuthContext } from '../../contexts/AuthContext';
import { CarContext } from '../../contexts/CarContext';
import * as commentsService  from '../../services/commentsService';

import { Comments } from './Comments/Comments'

export const Details = () => {

    const {userId, isAuthenticated, userName, email} = useContext(AuthContext);
    const {onDeleteCar} = useContext(CarContext);
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState({});
   
    useEffect(() => {
        Promise.all([
            carService.getOne(carId),
            commentsService.getAll(carId),
        ]).then(([carData, comments]) => {
            setCar({
                ...carData,
                comments,
            });
            
        });
    }, [carId]);

        // like button
    // const [like, setLike] = useState(1),
    //       [isLike, setIsLike] = useState(false),
    //     onLikeButtonClick = () => {
    //         setLike(like + (isLike ? -1 : 1));
    //         setIsLike(!isLike);
    //     };

        const isOwner = car._ownerId === userId;
        
        const onDeleteClick = async () => {

            await carService.removeCar(car._id);
    
            onDeleteCar(car._id);
    
            navigate('/catalog');
        };

        // comments
       
        const onCommentSubmit = async (values) => {
            const response = await commentsService.create(carId, values.comment);

            //  const date =  new Date().toLocaleString()
             

            setCar(state => ({
                ...state,
                comments: [...state.comments, 
                    {
                     ...response,
                    //  dateOnCreate: date, 
                     author: {
                        email,
                        userName
                     } 
                    }]
            })
            );
        };
console.log(car.comments);
        const onDeleteComment = async (id) => {
            
         await commentsService.deleteComment(id);

        setCar(state => ({
            ...state,
            comments: [...state.comments.filter(com => com._id !== id)]
        }))
            
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
                    <Link to={`/catalog/${car._id}/edit`} className="details-btn-edit">Edit</Link>
                    <button className="details-btn-del" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
                
                <div className="details-comments">
                    <h4>Comments:</h4>
                    <ul >
                        {car.comments && car.comments.map(x => (
                             
                            <li key={x._id} className="comment">
                                {/* <time>{x.dateOnCreate}</time> */}
                                <p>{x.author.userName}: {x.comment}</p>
                                {x.author._id === userId && (
                                    <button onClick={() => onDeleteComment(x._id)}>x</button>
                                )}
                            </li>
                        ))}
                    </ul>

                    {!car.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {/* like button */}
                {/* <button
                    className={"like-button " + (isLike ? "liked" : "")}
                    onClick={onLikeButtonClick}
                >
                    {"Like"}  {like}
                </button> */}
            </div>
            {isAuthenticated && <Comments onCommentSubmit={onCommentSubmit} />}
        </div>
    );
}