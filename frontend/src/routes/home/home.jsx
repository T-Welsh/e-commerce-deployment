import './home.css';
import React, {Fragment, useState} from "react";
import Header from '../../components/header/Header';
import ProductList from "../../components/productList/ProductList";
import Searchbar from "../../components/searchbar/Searchbar";

const Home = ({isAuthenticated, setAuth}) => {

    return (
        <Fragment>
        <div id='homeContainer'>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
            <Searchbar/>
            <div className="contentBody">
                <h1>Home Page</h1>
                <ProductList/>
            </div>
        </div>
        </Fragment>
    );
}; 

export default Home;