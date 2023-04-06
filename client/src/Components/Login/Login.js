import "./Login.css";

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

export const Login = () => {

    const { onLoginSubmit, error, isError } = useContext(AuthContext);
    
    const{ values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onLoginSubmit);

    return (
        
        <section className="login-page">

            {isError && (
                <div className='loginError'>
            <p>{error}</p>
            </div>
            )}

            <form id="login" method='POST' onSubmit={onSubmit}>

                <div className="login-container">
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={values.email} onChange={changeHandler} placeholder="test@gmail.com"/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={values.password} onChange={changeHandler}/>
                    <input type="submit" className="btn submit" value="Login"/>
                    <p className="field">
                        <span>Not registered? <Link to="/register">Create on account</Link></span>
                    </p>  
                </div>
            </form>
        </section>
    );
}