import React, {Fragment, useState} from "react";
import PasswordUpdate from "../components/passwordUpdate/PasswordUpdate";
import UserInfo from "../components/userInfo/UserInfo";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";

const Dashboard = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    const [isPassportUser, setIsPassportUser] = useState(false);

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <Link to="/orders">Order History</Link>
            <UserInfo setIsPassportUser={setIsPassportUser}/>
            {!isPassportUser ? <PasswordUpdate/> : <p><i class="bi bi-google"></i> Signed in with Google</p>}
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default Dashboard;