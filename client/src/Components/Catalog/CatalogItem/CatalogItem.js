import { Link } from 'react-router-dom'

export const CatalogItem = ({
    _id,
    model,
    type,
    kilometers,
    description,
    imageUrl,
    price,
}) => {
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
        </div>
    );
}