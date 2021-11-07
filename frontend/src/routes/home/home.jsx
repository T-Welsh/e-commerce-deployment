import './home.css';
import React, {Fragment, useState} from "react";
import Header from '../../components/header/Header';
import ProductList from "../../components/productList/ProductList";
import Searchbar from "../../components/searchbar/Searchbar";
import Footer from '../../components/footer/Footer';

const Home = ({isAuthenticated, setAuth}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [department, setDepartment] = useState('');

    return (
        <Fragment>
        <div id='homeContainer'>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
            <Searchbar setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <div className="contentBody">
                <h2>All Departments</h2>
                <div id='productListContainer'>
                    <ProductList searchTerm={searchTerm} department={department}/>
                </div>
            </div>
        </div>
        </Fragment>
    );
}; 

export default Home;