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
            <Link to="/home">Home</Link>
            {isAuthenticated ? <button onClick={ e => logout(e)}>Logout</button> : <Link to="/login">Login or Register</Link>}
            <Link to="/dashboard">Dashboard</Link>
        </Fragment>
    )

}

export default Header;