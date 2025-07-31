import React from "react"
import "./Navbar.css" 
import mainLogo from '/trans-logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="nav-left">
            <a href="/">Reset</a>
        </div>

        <div className="logo">
            <img src={mainLogo} alt="Martini's Pokelab logo" />
        </div>

        <div className="nav-right">
            <a href="/about">About Us</a>
        </div>
    </nav>

  );
};

export default Navbar;
