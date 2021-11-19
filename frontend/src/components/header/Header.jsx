import './Header.css';
import React, { Fragment, useEffect, useState } from 'react';
import {Link, NavLink} from "react-router-dom";
import BurgerMenu from "../burgerMenu/burgerMenu";


const Header = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    const handleresize = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.onresize = handleresize;
    }, [])


    const renderMenu = (windowWidth) => {
        if (windowWidth < 767){
            return (
                <nav className="burgerNav" aria-label="Menu">
                    <BurgerMenu isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
                </nav>
            )
        }
        else return (
            <nav className="navMenu">
                    <Link to="/home" className="navLink" onClick={()=>{handleShopReset()}}>Shop</Link>
                    {isAuthenticated ? <Link to="/login" className="navLink" onClick={ e => logout(e)}>Logout</Link> : <Link to="/login" className="navLink">Login or Register</Link>}
                    <Link to="/dashboard" className="navLink">Account</Link>
                    <Link to="/cart" className="navLink"><i class="bi bi-cart3"></i> Cart</Link>
            </nav>
        )
    }

    return(
        <Fragment>
            <header id='header'>
                <NavLink to='/home' onClick={() => {handleShopReset()}}><h1 id='companyName' >The Suffolk Company</h1></NavLink>
                {renderMenu(windowWidth)}
            </header>
        </Fragment>
    )
}

export default Header;
