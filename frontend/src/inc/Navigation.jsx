import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logout from '../components/Logout';

const Navigation = () => {
    const user = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={'#'}>
                User
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                {!user &&
                <>
                <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                    Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/register'}>
                    Register
                    </Link>
                </li>
                </>
                }
                {user &&
                <>
                <li className="nav-item">
                    <Link className="nav-link" onClick={Logout}>
                    Logout
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/dashboard'}>
                    Dashboard
                    </Link>
                </li>
                </>}
                </ul>
            </div>
            </div>
        </nav>
    )
};
export default Navigation;  