import { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export const useForm = (initialValues, onSubmitHandler) => {

    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [submitError, setSubmitError] = useState(null);

    const { errors, setSubmitAuthError } = useContext(AuthContext)

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!errors) {
            setSubmitAuthError()
        }

        // empty input
        if (values.description === "" || values.imageUrl === "" || values.model === "" || values.price === "" || values.type === "") {
            setSubmitError('All input are require!')

            setTimeout(() => {
                setSubmitError(null)
            }, "2000");
            return
        }

        // edit comment error
        if (values.comment?.length < 1 || values.comment?.length > 200) {
            setSubmitError('The comment should be between 1 and 200 characters');

            setTimeout(() => {
                setSubmitError(null)
            }, "2000");
            return
        }

        onSubmitHandler(values);

        setValues(initialValues);
    };

    const changeValues = (newValues) => {

        setValues(newValues);
    };


    const validUrl = /^https?:\/\//g

    const formValidate = (e) => {

        const value = e.target.value;
        const errors = {};

        if (e.target.name === 'model' && (value.length < 3 || value.length > 20)) {
            errors.model = 'First name should be between 3 and 20 characters';
        }

        if (e.target.name === 'kilometers' && (value < 0 || value > 1000000)) {
            errors.kilometers = 'The kilometers should be between 0 and 1000000 characters';
        }

        if (e.target.name === 'imageUrl' && !(validUrl.exec(value))) {
            errors.imageUrl = 'The imageUrl should be start with http/s';
        }
        if (e.target.name === 'price' && (value <= 0)) {
            errors.price = 'The price should be positive number';
        }
        if (e.target.name === 'description' && (value.length <= 0 || value.length > 200)) {
            errors.description = 'The description should be between 0 and 200 characters';
        }


        setFormErrors(errors);
    };

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
        formValidate,
        formErrors,
        submitError
    };
};

