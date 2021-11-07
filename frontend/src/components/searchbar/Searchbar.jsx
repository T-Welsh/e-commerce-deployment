import React, { Fragment, useEffect, useState } from 'react';
import './Searchbar.css';



const Searchbar = ({setSearchTerm, setDepartment}) => {

    const handleClick = (category) => {
        setDepartment(category);
    }
    const [input, setInput] = useState()

    const onChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(input);
    }

    return(
        <Fragment>
            <aside className="sidebar">
                <nav className="nav">
                    <form onSubmit={handleSubmit}>
                        <input type="search" name="search" id="search" onChange={e => onChange(e)}/>
                        <input type="submit" value="Search"/>
                    </form>
                    <ul>
                        <li><button onClick={() => {handleClick('')}}>All Departments</button></li>
                        <li><button onClick={() => {handleClick('household')}}>Household</button></li>
                        <li><button onClick={() => {handleClick('kitchen')}}>Kitchen</button></li>
                        <li><button onClick={() => {handleClick('bathroom')}}>Bathroom</button></li>
                        <li><button onClick={() => {handleClick('outdoor')}}>Outdoor</button></li>
                        <li><button onClick={() => {handleClick('accessories')}}>Accessories</button></li>
                        <li><button onClick={() => {handleClick('stationary')}}>Stationary</button></li>
                    </ul>
                </nav>
            </aside>
        </Fragment>
    )

}

export default Searchbar;