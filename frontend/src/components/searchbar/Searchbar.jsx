import React, { Fragment, useState } from 'react';
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
                        <li><button onClick={() => {handleClick('Household')}}>Household</button></li>
                        <li><button onClick={() => {handleClick('Kitchen')}}>Kitchen</button></li>
                        <li><button onClick={() => {handleClick('Bathroom')}}>Bathroom</button></li>
                        <li><button onClick={() => {handleClick('Outdoor')}}>Outdoor</button></li>
                        <li><button onClick={() => {handleClick('Accessories')}}>Accessories</button></li>
                        <li><button onClick={() => {handleClick('Stationary')}}>Stationary</button></li>
                    </ul>
                </nav>
            </aside>
        </Fragment>
    )

}

export default Searchbar;