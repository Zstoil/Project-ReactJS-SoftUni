import "./Details.css";

import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'

import * as carService from '../../services/carService';
import * as commentsService from '../../services/commentsService';
import * as likeService from '../../services/likeService';
import * as unLikeService from '../../services/unLikeService';

import { AuthContext } from '../../contexts/AuthContext';
import { CarContext } from '../../contexts/CarContext';

import { Comments } from './Comments/Comments'
import { DeleteModal } from './DeleteModal/DeleteModal';

export const Details = () => {

    const { userId, isAuthenticated, userName, email } = useContext(AuthContext);
    const { onDeleteCar } = useContext(CarContext);
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState({});
    const [showBlog,SetShowBlog] = useState(false);
    

    useEffect(() => {
        Promise.all([
            carService.getOne(carId),
            commentsService.getAll(carId),
            likeService.getAllLike(carId),
            unLikeService.getAllUnLike(carId),
        ]).then(([carData, comments, like, unLike]) => {
            setCar({
                ...carData,
                comments,
                like,
                unLike,
            });

        });
    }, [carId]);

    const isOwner = car._ownerId === userId;

    const isLike = car.like?.find(x => x._ownerId == userId);

    const isUnLike = car.unLike?.find(x => x._ownerId == userId);

    // like button
    
    const onLikeClick = async () => {
        
            const response = await likeService.like(carId, userId);

            const isUnLike = await unLikeService.getAllUnLike(carId, userId);

            const isCurrentUnLike = isUnLike.find(x => x._ownerId === userId);

            if(isCurrentUnLike){
                await unLikeService.deleteUnLike(isCurrentUnLike._id);
                
            };

            setCar(state => ({
                     ...state,
                    like: [...state.like,
                    {
                       ...response, 
                    }],
                })
                );

    };

    // unLike button

    const onUnLikeClick = async () => {
        
        const response = await unLikeService.unLike(carId, userId);

        const isLike = await likeService.getAllLike(carId, userId);

            const isCurrentLike = isLike.find(x => x._ownerId === userId);

            if(isCurrentLike){
                await likeService.deleteLike(isCurrentLike._id);
            };

        setCar(state => ({
                 ...state,
                 unLike: [...state.unLike,
                {
                   ...response, 
                }]
            })
            );

};

    //delete car
    const onDeleteClick = async () => {
       
        await carService.removeCar(car._id);

        onDeleteCar(car._id);

        navigate('/catalog'); 
        
    };

    const onClose = () => {
        SetShowBlog(null);
    }

    const showDeleteBlog = () => {
        SetShowBlog(true);
    }

    // comments

    const onCommentSubmit = async (values) => {

        const response = await commentsService.create(carId, values.comment);

        setCar(state => ({
            ...state,
            comments: [...state.comments,
            {
                ...response, 
                author: {
                    email,
                    userName
                }
            }]
        })
        );
    };
    // const onEditComment = async (id) => {

    //  const result = await commentsService.editComment(id);

    //  console.log(result);
    // }

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
                        <Link className="details-btn-del" onClick={showDeleteBlog}>Delete</Link>
                    </>
                )}
                {!isLike && (
                    <Link className='like-btn' onClick={onLikeClick}>Like</Link>
                )}
                {!isUnLike && (
                    <Link className='unLike-btn' onClick={onUnLikeClick}>unLike</Link>
                )}


                    {/* Comments */}

                <div className="details-comments">
                    <h4>Comments:</h4>
                    <ul >
                        {car.comments && car.comments.map(x => (

                            <li key={x._id} className="comment">
                                <p>{x.author.userName}: {x.comment}</p>
                                {x._ownerId === userId && (
                                    <div>
                                    <button className='del-comment' onClick={() => onDeleteComment(x._id)}>x</button>
                                    {/* <button onClick={() => onEditComment(x._id)}>Edit</button> */}
                                    </div>
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

            {showBlog && <DeleteModal 
            onClose={onClose} 
            onDeleteClick={onDeleteClick}
            car = {car}
            />}
        </div>

        
    );
}