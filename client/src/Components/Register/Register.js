import "./Register.css";

import { Link } from "react-router-dom";
import { useContext } from "react";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

export const Register = () => {

    const { onRegisterSubmit, error, isError } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        userName: '',
        email: '',
        password: '',
        repeatedPassword: '',
    }, onRegisterSubmit)

    return (
        <section className="register-page">

            {isError && (
                <div className='registerError'>
                    <p>{error}</p>
                </div>
            )}

            <form id="register" method="POST" onSubmit={onSubmit}>

                <div className="register-container">
                    <h2>Register</h2>

                    <label htmlFor="userName">User name:</label>
                    <input type="userName" id="userName" name="userName" placeholder="userName" value={values.userName} onChange={changeHandler} />
                    
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="reg-email" name="email" placeholder="test@gmail.com" value={values.email} onChange={changeHandler} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="reg-password" name="password" value={values.password} onChange={changeHandler} />

                    <label htmlFor="repeated-password">Repeated password:</label>
                    <input type="password" id="reg-repeated-password" name="repeatedPassword" value={values.repeatedPassword} onChange={changeHandler} />

                    <input type="submit" className="btn submit" value="Register" />
                    <p className="field">
                        <span>Already have account? <Link to="/login">login</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}