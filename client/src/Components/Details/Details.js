import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'

import * as carService from '../../services/carService';
import * as commentsService from '../../services/commentsService';
import * as likeService from '../../services/likeService';

import { AuthContext } from '../../contexts/AuthContext';
import { CarContext } from '../../contexts/CarContext';

import { Comments } from './Comments/Comments'

export const Details = () => {

    const { userId, isAuthenticated, userName, email } = useContext(AuthContext);
    const { onDeleteCar } = useContext(CarContext);
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState({});



    useEffect(() => {
        Promise.all([
            carService.getOne(carId),
            commentsService.getAll(carId),
            likeService.getAllLike(carId),
        ]).then(([carData, comments, like]) => {
            setCar({
                ...carData,
                comments,
                like,
            });

        });
    }, [carId]);



    // like button
    const isLike = car.like?.find(x => x._ownerId == userId);

    const onLikeClick = async () => {

        const response = await likeService.like(carId, userId);

        setCar(state => ({
            ...state,
            like: [...state.like,
            {
                ...response, 
            }]
        })
        );
    }

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
                    <>
                        <Link to={`/catalog/${car._id}/edit`} className="details-btn-edit">Edit</Link>
                        <Link className="details-btn-del" onClick={onDeleteClick}>Delete</Link>
                    </>
                )}
                {!isLike && (
                    <Link className={'like-btn'} onClick={onLikeClick}>Like</Link>
                )}


                    {/* Comments */}

                <div className="details-comments">
                    <h4>Comments:</h4>
                    <ul >
                        {car.comments && car.comments.map(x => (

                            <li key={x._id} className="comment">
                                {/* <time>{x.dateOnCreate}</time> */}
                                <p>{x.author.userName}: {x.comment}</p>
                                {x._ownerId === userId && (
                                    <button onClick={() => onDeleteComment(x._id)}>x</button>
                                )}
                            </li>
                        ))}
                    </ul>

                    {!car.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

            </div>
            {isAuthenticated && <Comments onCommentSubmit={onCommentSubmit} />}
        </div>
    );
}