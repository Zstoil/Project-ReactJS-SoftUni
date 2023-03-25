import { Link } from "react-router-dom";

export const Register = () => {
    return (
        <section className="register-page">
            <form id="register">

                <div className="register-container">
                    <h2>Register</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="reg-email" name="email" placeholder="test@gmail.com"/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="reg-password" name="password"/>

                    <label htmlFor="repeated-password">Repeated password:</label>
                    <input type="password" id="reg-repeated-password" name="repeated-password"/>

                    <input type="submit" className="btn submit" value="Register"/>
                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}