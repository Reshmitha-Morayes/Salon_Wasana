import React from "react";
import Link from 'react-router-dom';
import './Navbar.css'

function Navbar(){
    <div className="navcontainer">
            
            <nav>
                
                <div className="logocontainer">
                    <img src={logo} alt="logo" style={{ width: '80px', height: 'auto', marginRight: '60px', marginLeft: '30px'}}/>
                </div>
    
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        <Link to="/ServiceHomeScreen">Services</Link>
                    </li>
                    <li>
                        Courses
                    </li>
                    <li>
                        Gift Vouchers
                    </li>
                    <li>
                        Products
                    </li>
                    <li>
                        Login
                    </li>
                </ul>
            </nav>
    </div>
}

export default Navbar;