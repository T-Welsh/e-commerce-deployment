import './Header.css';
import React, { Fragment } from 'react';
import {Link, NavLink} from "react-router-dom";

const Header = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    const logout = (e) => {
        //prevent page refresh
        e.preventDefault()
        localStorage.removeItem('token');
        setAuth(false);
    }

    const handleShopReset = () => {
        setSearchTerm('');
        setDepartment('');
    }



    return(
        <Fragment>
            <div id='header'>
                <h1 id='companyName' ><NavLink to='/home' onClick={() => {handleShopReset()}}>The Suffolk Company</NavLink></h1>
                <ul>
                    <li><Link to="/home" onClick={()=>{handleShopReset()}}>Shop</Link></li>
                    <li>{isAuthenticated ? <Link to="/login" onClick={ e => logout(e)}>Logout</Link> : <Link to="/login">Login or Register</Link>}</li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
                
            </div>
        </Fragment>
    )

}

export default Header;
