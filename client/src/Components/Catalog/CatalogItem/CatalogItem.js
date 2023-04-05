import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom'

import * as likeService from '../../../services/likeService';
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
    ]).then(([carData, like]) => {
        setCar({
            ...carData,
            like
        });

    });
}, [_id]);
    
    return (
        <div className="car">
            <div>
                <img className="image" src={imageUrl}/>
            </div>
            <p>Model:{model}</p>
            <p>Type:{type}</p>
            <p>Kilometers:{kilometers} km</p>
            <p>Price:{price} &#x20AC;</p>
            <p>Description:{description}</p>
            <Link  to={`/catalog/${_id}`} className="details-btn">Details</Link>
            <span className='count-likes'><span className='heart'>&#128153;</span>{car.like?.length}</span>
        </div>
    );
}