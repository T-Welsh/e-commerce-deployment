import './login.css';
import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Login = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    const { REACT_APP_BACK_END_ADDRESS } = process.env;
    //console.log(`Back end address is ${REACT_APP_BACK_END_ADDRESS}`);

    const [credentialsValid, setCredentialsValid] = useState(true);

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async (e) => {
        //prevent page refresh
        e.preventDefault()

        try {
            const body = { email, password }



            const response = await fetch(`/auth/login`, {
                method: "POST",
                headers: {"content-type" : "application/json;charset=UTF-8"},
                mode: 'cors',
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            if (!parseRes.token){
                setCredentialsValid(false);
                return;
            }
            //document.cookie = `token=${parseRes.token}`;
            localStorage.setItem("token", parseRes.token);
            setAuth(true);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}  setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <body className="contentContainer">
                <div className="contentBody" id="loginBody">
                    <h2 className="subHeadings" id="loginSubHdg" >Sign in</h2>
                    {credentialsValid ? null : <p id='loginError'>Email or Password is incorrect</p>}
                    <form id="loginForm" onSubmit={onSubmitForm}>
                        <input className="loginInput" type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                        <input  className="loginInput" type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}/>
                        <button class="loginBtn" type="submit">Login</button>
                    </form>
                    <Link to="/register" id="registerBtn" >Register</Link>
                    <a className="passportBtn" href={`/auth/google`}>
                        <button id="googleLoginBtn">
                            {/*<i class="bi bi-google"></i>*/}
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g>
                            </svg> Sign in with Google
                        </button>
                    </a>
                </div>
            </body>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default Login;

//<a className="passportBtn" href={`${REACT_APP_BACK_END_ADDRESS}/auth/google`}></a>