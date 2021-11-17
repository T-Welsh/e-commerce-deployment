import React, {Fragment} from "react";
import PasswordUpdate from "../components/passwordUpdate/PasswordUpdate";
import UserInfo from "../components/userInfo/UserInfo";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";

const Dashboard = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <Link to="/orders">Order History</Link>
            <UserInfo/>
            <PasswordUpdate/>
        </Fragment>
    );
}; 

export default Dashboard;