import './Footer.css';
import React, { Fragment } from 'react';
import {Link} from "react-router-dom";

const Footer = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    const handleShopReset = () => {
        setSearchTerm('');
        setDepartment('');
    }

    return(
        <Fragment>
            <footer id='footer'>
                <Link to="/home"><h2 id='footerCompanyName' onClick={()=>{handleShopReset()}}>The Suffolk Company</h2></Link>
                <div id="footerInfoContainer">
                    <nav id="footerNav">
                        <h3>Information</h3>
                        {/*<Link to="/home" onClick={()=>{handleShopReset()}}>Shop</Link>*/}
                        <Link to="/dashboard">Account</Link>
                        <Link to="/home">Terms and Conditions</Link>
                        <Link to="/home">About Us</Link>
                        <Link to="/home">Returns</Link>
                    </nav>
                    <div id="contactContainer">
                        <h3>Contact</h3>
                        <p>+44 (0)1284 7729 6403</p>
                        <div id="addressContainer">
                            <p>No.16 Abbeygate St.</p>
                            <p>Bury St. Edmunds</p>
                            <p>Suffolk, IP33 1UN</p>
                        </div>
                        <p>enquiries@TheSuffolkCo.com</p>
                    </div>
                    <div id="socialMediaContainer">
                        <h3>Follow</h3>
                        <div>
                            <a href="https://twitter.com/" aria-label="twitter"><i class="bi bi-twitter"></i></a>
                            <a href="https://www.instagram.com/" aria-label="instagram"><i class="bi bi-instagram"></i></a>
                            <a href="https://www.facebook.com/" aria-label=""facebook><i class="bi bi-facebook"></i></a>
                        </div>
                        
                    </div>
                </div>
                <p>Registered in England under registration no. 04024689</p>
                <p>The Suffolk Company Ltd &copy;</p> 
            </footer>
        </Fragment>
    )

}

export default Footer;