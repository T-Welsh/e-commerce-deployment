import React, {Fragment, useEffect, useState} from "react";
import PasswordUpdate from "../components/passwordUpdate/PasswordUpdate";
import UserInfo from "../components/userInfo/UserInfo";

const Dashboard = () => {

    return (
        <Fragment>
            <UserInfo/>
            <PasswordUpdate/>
        </Fragment>
    );
}; 

export default Dashboard;