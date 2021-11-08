import React, {Fragment} from "react";
import PasswordUpdate from "../components/passwordUpdate/PasswordUpdate";
import UserInfo from "../components/userInfo/UserInfo";
import Header from "../components/header/Header";

const Dashboard = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <UserInfo/>
            <PasswordUpdate/>
        </Fragment>
    );
}; 

export default Dashboard;