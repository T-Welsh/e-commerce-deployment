import React, { Fragment, useEffect, useState } from 'react';
import './Searchbar.css';



const Searchbar = () => {

    

    return(
        <Fragment>
            <aside className="sidebar">
                <nav className="nav">
                    <input type="text" name="" id="" />
                    <ul>
                        <li>Household</li>
                        <li>Kitchen</li>
                        <li>Bathroom</li>
                        <li>Outdoor</li>
                        <li>Accessories</li>
                        <li>Stationery</li>
                    </ul>
                </nav>
            </aside>
        </Fragment>
    )

}

export default Searchbar;