import React, {Fragment} from "react";
import PasswordUpdate from "../components/passwordUpdate/PasswordUpdate";
import UserInfo from "../components/userInfo/UserInfo";
import Header from "../components/header/Header";

const Dashboard = ({isAuthenticated, setAuth}) => {

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
            <UserInfo/>
            <PasswordUpdate/>
        </Fragment>
    );
}; 

export default Dashboard;