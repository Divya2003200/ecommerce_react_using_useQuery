
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navpar.css'

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">E-Commerce</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                
            </div>
        </nav>
    );
};

export default Navbar;
