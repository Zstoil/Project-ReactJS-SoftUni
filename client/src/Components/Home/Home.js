import "./Home.css";

import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="home">
            <h1>Buy car</h1>
            <div className="introduction">
                <p>Welcome to our car sales site</p>
                <span><Link className="button" to="/catalog">Find car</Link> </span>
            </div>


        </div>
    );
};