import React, {Fragment, useState} from "react";
import Header from "../components/header/Header";


const Home = ({isAuthenticated, setAuth}) => {

    return (
        <Fragment>
           <div>
          <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
          <h1>Home Page</h1>

        </div>
        </Fragment>
    );
}; 

export default Home;