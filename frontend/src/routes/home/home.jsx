import './home.css';
import React, {Fragment } from "react";
import Header from '../../components/header/Header';
import ProductList from "../../components/productList/ProductList";
import Searchbar from "../../components/searchbar/Searchbar";
import Footer from '../../components/footer/Footer';

const Home = ({isAuthenticated, setAuth, searchTerm, setSearchTerm, department, setDepartment }) => {
    //const [searchTerm, setSearchTerm] = useState('');
    //const [department, setDepartment] = useState('');

    return (
        <Fragment>
            <div className="contentContainer" id='homeContainer'>
                <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
                <Searchbar setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
                <div className="contentBody">
                    <h2>{department === '' ? "All Departments": (`${department} ${searchTerm === '' ? searchTerm : `> ${searchTerm}`}`)}</h2>
                    <div id='productListContainer'>
                        <ProductList searchTerm={searchTerm} department={department}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}; 

export default Home;