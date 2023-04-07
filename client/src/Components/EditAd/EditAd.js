import "./EditAd.css";

import { useContext, useEffect, Navigate} from 'react';
import { useParams } from 'react-router-dom';

import * as carService from '../../services/carService';

import { CarContext } from '../../contexts/CarContext';

import { useForm } from '../../hooks/useForm';


export const EditAd = () => {

    const { carId } = useParams();

    const { onEditCarSubmit } = useContext(CarContext);

    const {values,changeHandler,onSubmit,changeValues,formValidate, formErrors, submitError} = useForm({
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

                <form id="create" method="post" onSubmit={onSubmit}>
                    <h2>Create a new Ad</h2>

                    <label htmlFor="car-model">Car Model:</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Enter car model..."
                        value={values.model}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        style={formErrors.model ? { borderColor: "red" } : {}}
                    />
                    {formErrors.model &&
                        <p className="form-error">
                            {formErrors.model}
                        </p>
                    }
                    <label htmlFor="Type">Type:</label>
                    <select value={values.type} onChange={changeHandler} id="type" name="type">
                        <option value="" disabled selected>Select your option</option>
                        <option value="diesel">Diesel</option>
                        <option value="gasoline">Gasoline</option>
                        <option value="gas">Gas</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="electric">Electric</option>
                    </select>

                    <label htmlFor="kilometers">Kilometers:</label>
                    <input
                        type="number"
                        id="kilometers"
                        name="kilometers"
                        min="1"
                        placeholder="1"
                        value={values.kilometers}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        style={formErrors.kilometers ? { borderColor: "red" } : {}}
                    />
                    {formErrors.kilometers &&
                        <p className="form-error">
                            {formErrors.kilometers}
                        </p>
                    }

                    <label htmlFor="car-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        value={values.imageUrl}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        style={formErrors.imageUrl ? { borderColor: "red" } : {}}
                    />

                    {formErrors.imageUrl &&
                        <p className="form-error">
                            {formErrors.imageUrl}
                        </p>
                    }

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        min="1"
                        placeholder="Price is in Euro"
                        value={values.price}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        style={formErrors.price ? { borderColor: "red" } : {}}
                    />

                    {formErrors.price &&
                        <p className="form-error">
                            {formErrors.price}
                        </p>
                    }

                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        style={formErrors.description ? { borderColor: "red" } : {}}
                    ></textarea>

                    {formErrors.description &&
                        <p className="form-error">
                            {formErrors.description}
                        </p>
                    }

                    <input className="btn submit" type="submit" value="Create Car Ad" />

                    {submitError && (
                <div className='submit-error'>
                    <p>{submitError}</p>
                </div>
            )}
                </form>
            </div>
        </section>
    );
}