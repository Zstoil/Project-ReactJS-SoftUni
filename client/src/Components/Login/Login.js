import { Link } from 'react-router-dom'

export const Login = () => {
    return (
        <section className="login-page">
            <form id="login">

                <div className="login-container">
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="test@gmail.com"/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"/>
                    <input type="submit" className="btn submit" value="Login"/>
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}