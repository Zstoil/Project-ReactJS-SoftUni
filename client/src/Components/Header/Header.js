import "./Header.css";

import { useContext } from 'react';
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {

    const { isAuthenticated ,userName } = useContext(AuthContext);
    
    return (
        <header>
            <div className="main-header">
                <nav className="menu">
                    <ul>
                        <li className="beginning"><Link to="/">Home</Link></li>
                        <li><Link to='/catalog'>Catalog</Link></li>
                        {isAuthenticated && (
                            <>
                                <li><Link to='/create'>Create</Link></li>
                                <li><Link to='/search'>Search</Link></li>
                                <li><Link to='/logout'>Logout</Link></li>
                                
                            </>
                        )}

                        {!isAuthenticated && (
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
                {isAuthenticated && (
                    <div className='loginUser'>
                        <div className='myAdd'>
                            <Link to='/myAd'>My Ads</Link>
                        </div>
                        <span>{userName}</span>
                    </div>
                )}
            </div>
        </header>

    );
};