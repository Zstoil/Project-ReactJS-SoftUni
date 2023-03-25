import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header>
            <div className="main-header">
                <nav className="menu">
                    <ul>
                        <li className="beginning"><Link to="/">Home</Link></li>
                        <li><Link to='/create'>Create</Link></li>
                        <li><Link to='/catalog'>Catalog</Link></li>
                        <li><Link to='/search'>Search</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                        <li><Link to=''>Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        
    );
};