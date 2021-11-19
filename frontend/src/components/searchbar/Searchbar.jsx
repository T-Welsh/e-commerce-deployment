import React, { Fragment, useState } from 'react';
import './Searchbar.css';



const Searchbar = ({setSearchTerm, setDepartment}) => {

    const [expanded, setExpanded] = useState(false);

    const handleClick = (category) => {
        setDepartment(category);
        setExpanded(false);
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
                {/*
                    <form onSubmit={handleSubmit} id="productSearch">
                        <input type="search" name="search" id="search" onChange={e => onChange(e)} spellCheck="false" aria-label="Search Products"/>
                        <input type="submit" value="Search" className="searchButton"/>
                    </form>
                */}               
                    {!expanded? 
                        <>                    
                        <form onSubmit={handleSubmit} id="productSearch">
                            <input type="search" name="search" id="search" onChange={e => onChange(e)} spellCheck="false" aria-label="Search Products"/>
                            <input type="submit" value="Search" className="searchButton"/>
                        </form>  
                        <button id="departmentCollapsed" onClick={() => {setExpanded(true)}}><i class="bi bi-list"></i>Department</button> 
                        </>
                        : 
                        <>  
                        <ul id="departmentList">
                            <li><button className="departmentSelector" onClick={() => {handleClick('')}}>All Departments</button></li>
                            <li><button className="departmentSelector" onClick={() => {handleClick('Household')}}>Household</button></li>
                            <li><button className="departmentSelector" onClick={() => {handleClick('Kitchen')}}>Kitchen</button></li>
                            <li><button className="departmentSelector" onClick={() => {handleClick('Bathroom')}}>Bathroom</button></li>
                            <li><button className="departmentSelector" onClick={() => {handleClick('Outdoor')}}>Outdoor</button></li>
                            <li><button className="departmentSelector" onClick={() => {handleClick('Accessories')}}>Accessories</button></li>
                            <li><button className="departmentSelector" onClick={() => {handleClick('Stationary')}}>Stationary</button></li>
                        </ul>
                        <form onSubmit={handleSubmit} id="productSearch">
                            <input type="search" name="search" id="search" onChange={e => onChange(e)} spellCheck="false" aria-label="Search Products"/>
                            <input type="submit" value="Search" className="searchButton"/>
                        </form>
                        <button id="departmentCollapsed" onClick={() => {setExpanded(false)}}><i class="bi bi-list"></i>Department</button>
                        </>

                    }
            </aside>
        </Fragment>
    )

}

export default Searchbar;