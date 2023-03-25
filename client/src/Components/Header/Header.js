import { useContext } from 'react';
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {

    const { isAuthenticated, userEmail } = useContext(AuthContext);

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
                          <li><Link to=''>Logout</Link></li>  
                          

                          
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
                <span>{userEmail}</span>
                    </div>
                )}
                
            </div>
        </header>
        
    );
};