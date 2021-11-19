import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from "react-router-dom";
import './burgerMenu.css';


const BurgerMenu = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

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
        <div className="burgerContainer" >
        <Menu /*right*/ >
            <NavLink to="/home" className="menu-item" onClick={()=>{handleShopReset()}}>Shop</NavLink>
            {isAuthenticated ? <NavLink to="/login" className="menu-item" onClick={ e => logout(e)}>Logout</NavLink> : <NavLink to="/login" className="menu-item">Login or Register</NavLink>}
            <NavLink to="/dashboard" className="menu-item">Dashboard</NavLink>
            <NavLink to="/cart" className="menu-item">Cart</NavLink>
        </Menu>
        </div>
    )
}

export default BurgerMenu;