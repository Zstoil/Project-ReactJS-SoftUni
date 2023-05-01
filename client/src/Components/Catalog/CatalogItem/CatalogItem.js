import "./CatalogItem.css";

import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom'

import * as likeService from '../../../services/likeService';
import * as unLikeService from '../../../services/unLikeService';
import * as carService from '../../../services/carService';



export const CatalogItem = ({
    _id,
    model,
    type,
    kilometers,
    description,
    imageUrl,
    price,
}) => {

    const[car,setCar]= useState({});


  useEffect(() => {
    Promise.all([
        carService.getOne(_id),
        likeService.getAllLike(_id),
        unLikeService.getAllUnLike(_id),
    ]).then(([carData, like, unLike]) => {
        setCar({
            ...carData,
            like,
            unLike
        });

    });
}, [_id]);
    
    return (
        <div className="car">
            <div>
                <img className="image" src={imageUrl}/>
            </div>
            <p>Model: {model}</p>
            <p>Type: {type}</p>
            <p>Kilometers: {kilometers} km</p>
            <p>Price: <span className="price">{price} &#x20AC;</span></p>
            <p>Description:{description}</p>
            <div className='car-like'>
            <Link  to={`/catalog/${_id}`} className="details-btn">Details</Link>
            <span className='heart count-likes'> &#128153; {car.like?.length}</span> 
            <span className='count-unLikes'> <span className='heart'> &#128148;</span> {car.unLike?.length}</span>
            </div>
        </div>
    );
}