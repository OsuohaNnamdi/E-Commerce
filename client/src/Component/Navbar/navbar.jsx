import React, { useState } from "react";
import { User, ShoppingCart, SignOut, Users, ShoppingBagOpen, House } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    const auth = localStorage.getItem("User");
    const Admin = localStorage.getItem("Admin");

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="navbar">
            
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            
                <div className={`links ${menuOpen ? "show" : ""}`}>
                    <Link to="/">
                        <button className="bttn"><House size={32} /></button>
                    </Link>
                    <Link to="/profile">
                        <button className="bttn"><User size={32} /></button>
                    </Link>
                    <Link to="/cart">
                        <button className="bttn"><ShoppingCart size={32} /></button>
                    </Link>
{/*                     <Link to="/signin">
                        <button className="bttn"><b>Sign In</b></button>
                    </Link>
                    <Link to="/signup">
                        <button className="bttn"><b>Sign Up</b></button>
                    </Link> */}
                </div>
            
        </div>
    );
};
