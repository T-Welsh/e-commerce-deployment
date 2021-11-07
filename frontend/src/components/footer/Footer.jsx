import './Footer.css';
import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const Footer = ({isAuthenticated, setAuth}) => {


    return(
        <Fragment>
            <div id='footer'>
                <h2 id='companyName' ><a href='/home'>The Suffolk Company</a></h2>
                <ul>
                    <li><Link to="/home">Shop</Link></li>
                    <li><Link to="/dashboard">Account</Link></li>
                    <li>Terms and Conditions</li>
                    <li>About Us</li>
                    <li>Returns</li>
                </ul>
                <p>&copy The Suffolk Company Ltd</p> 
            </div>
        </Fragment>
    )

}

export default Footer;