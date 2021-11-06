import './Header.css';
import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const Header = ({isAuthenticated, setAuth}) => {

    const logout = (e) => {
        //prevent page refresh
        e.preventDefault()
        localStorage.removeItem('token');
        setAuth(false);
    }



    return(
        <Fragment>
            <div id='header'>
                <h1 id='companyName' ><a href='/home'>The Suffolk Company</a></h1>
                <ul>
                    <li><Link to="/home">Shop</Link></li>
                    <li>{isAuthenticated ? <Link to="/login" onClick={ e => logout(e)}>Logout</Link> : <Link to="/login">Login or Register</Link>}</li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
                
            </div>
        </Fragment>
    )

}

export default Header;
