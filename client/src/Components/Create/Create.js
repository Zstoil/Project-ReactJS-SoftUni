import {useState} from 'react'

export const Create = ({
    onCreateGameSubmit,
}) => {

    const [values,setValue] = useState({
        model: '',
        type: '',
        kilometers: '',
        imageUrl: '',
        price: '',
        description: '',
    });

    const onChangeHandler = (e) => {
        setValue(state => ({...state, [e.target.name]: e.target.value}))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onCreateGameSubmit(values);
    }

    return (
        <section>
        <div className="container">
        <form id="create" onSubmit={onSubmit}>
            <h2>Create a new Ad</h2>

            <label htmlFor="car-model">Car Model:</label>
            <input value={values.model} onChange={onChangeHandler} type="text" id="model" name="model" placeholder="Enter car model..." />

            <label htmlFor="Type">Type:</label>
            <select value={values.type} onChange={onChangeHandler} id="type" name="type">
                <option value="diesel">Diesel</option>
                <option value="gasoline">Gasoline</option>
                <option value="gas">Gas</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
            </select>

            <label htmlFor="kilometers">Kilometers:</label>
            <input value={values.kilometers} onChange={onChangeHandler} type="text" id="kilometers" name="kilometers" min="1" placeholder="1" />

            <label htmlFor="car-img">Image:</label>
            <input value={values.imageUrl} onChange={onChangeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

            <label htmlFor="price">Price:</label>
            <input value={values.price} onChange={onChangeHandler} type="text" id="price" name="price" min="1" placeholder="Price is in Euro" />

            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" value={values.description} onChange={onChangeHandler}></textarea>
            <input ClassName="btn submit" type="submit" value="Create Car Ad" />
        </form>
    </div>
    </section>
    );
}