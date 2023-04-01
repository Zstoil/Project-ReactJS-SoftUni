import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

// import { useService } from '../../hooks/useService';
import * as carService from '../../services/carService';

export const EditAd = () => {

    const { carId } = useParams();

    // const carService = useService(carServiceFactory);

    const { onEditCarSubmit } = useContext(AuthContext);

    const {values,changeHandler,onSubmit,changeValues} = useForm({
        _id: '',
        model: '',
        type: '',
        kilometers: '',
        imageUrl: '',
        price: '',
        description: '',
    },onEditCarSubmit);

    useEffect(() => {
        carService.getOne(carId)
            .then(result => {
                changeValues(result);
            });
    },[carId]);

    return (
        <section>
        <div className="container">
        <form id="create" method='POST' onSubmit={onSubmit}>
            <h2>Edit Ad</h2>

            <label htmlFor="car-model">Car Model:</label>
            <input value={values.model} onChange={changeHandler} type="text" id="model" name="model" placeholder="Enter car model..." />

            <label htmlFor="Type">Type:</label>
            <select value={values.type} onChange={changeHandler} id="type" name="type">
                <option value="diesel">Diesel</option>
                <option value="gasoline">Gasoline</option>
                <option value="gas">Gas</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
            </select>

            <label htmlFor="kilometers">Kilometers:</label>
            <input value={values.kilometers} onChange={changeHandler} type="text" id="kilometers" name="kilometers" min="1" placeholder="1" />

            <label htmlFor="car-img">Image:</label>
            <input value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

            <label htmlFor="price">Price:</label>
            <input value={values.price} onChange={changeHandler} type="text" id="price" name="price" min="1" placeholder="Price is in Euro" />

            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" value={values.description} onChange={changeHandler}></textarea>
            <input className="btn submit" type="submit" value="Edit Ad" />
        </form>
    </div>
    </section>
    );
}