import React, {Fragment, useState} from "react";
import Header from "../components/header/Header";
import ProductList from "../components/productList/ProductList";

const Home = ({isAuthenticated, setAuth}) => {

    return (
        <Fragment>
        <div>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
            <h1>Home Page</h1>
            <ProductList/>
        </div>
        </Fragment>
    );
}; 

export default Home;