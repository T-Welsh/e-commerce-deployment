import './home.css';
import React, {Fragment } from "react";
import Header from '../../components/header/Header';
import ProductList from "../../components/productList/ProductList";
import Searchbar from "../../components/searchbar/Searchbar";
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';
import {useLocation} from "react-router-dom";

const Home = ({isAuthenticated, setAuth, searchTerm, setSearchTerm, department, setDepartment, verifyAuth}) => {

    const search = useLocation().search;
    const user = new URLSearchParams(search).get('user');

    //Save query params to local storage if user is not authenticated. This is used when user signs in using passportjs as server endpoint redirects to localhost:3000/home
    const initHome = () => {
        if(!isAuthenticated){
            localStorage.setItem("token", user);
            verifyAuth();
        }
    }

    useEffect(()=>{
        initHome(); 
    },[]);

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <body className="contentContainer" id='homeContainer'>
                
                <Searchbar setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
                <div className="contentBody">
                    <h2 className="subHeadings">Viewing {department === '' ? "All Departments": (`${department} ${searchTerm === '' ? searchTerm : `> ${searchTerm}`}`)}</h2>
                    <div id='productListContainer'>
                        <ProductList searchTerm={searchTerm} department={department}/>
                    </div>
                </div>
            </body>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default Home;