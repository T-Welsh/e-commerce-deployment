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


/*
    return(
        <Fragment>
            <div id='header'>
                <NavLink to='/home' onClick={() => {handleShopReset()}}><h1 id='companyName' >The Suffolk Company</h1></NavLink>
                <nav className="navMenu">
                <ul className="navList">
                    <Link to="/home" onClick={()=>{handleShopReset()}}><li className="navLink">Shop</li></Link>
                    {isAuthenticated ? <Link to="/login" onClick={ e => logout(e)}><li className="navLink">Logout</li></Link> : <Link to="/login"><li className="navLink">Login or Register</li></Link>}
                    <Link to="/dashboard"><li className="navLink">Dashboard</li></Link>
                    <Link to="/cart"><li className="navLink">Cart</li></Link>
                </ul>
                </nav>
                
            </div>
        </Fragment>
    )
*/

    return(
        <Fragment>
            <div id='header'>
                <NavLink to='/home' onClick={() => {handleShopReset()}}><h1 id='companyName' >The Suffolk Company</h1></NavLink>
                <nav className="navMenu">
                    <Link to="/home" className="navLink" onClick={()=>{handleShopReset()}}>Shop</Link>
                    {isAuthenticated ? <Link to="/login" className="navLink" onClick={ e => logout(e)}>Logout</Link> : <Link to="/login" className="navLink">Login or Register</Link>}
                    <Link to="/dashboard" className="navLink">Dashboard</Link>
                    <Link to="/cart" className="navLink">Cart</Link>
                </nav>
            </div>
        </Fragment>
    )
}

export default Header;
