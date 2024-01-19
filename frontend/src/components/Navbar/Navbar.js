import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
    return (
        <header className="navbar">
            <Link to="/">
                {/* logo */}
                <h1>modXchange</h1>  
            </Link>
            <Link to="/exchange">
                <h2>Post new exchange</h2>
            </Link>
        </header>
    )
}

export default Navbar;