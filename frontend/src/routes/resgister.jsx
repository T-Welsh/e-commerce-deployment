import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom"
import Header from "../components/header/Header";

const Register = ({isAuthenticated, setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        fname: "",
        lname: ""
    });

    const { email, password, fname, lname } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };

    const onSubmitForm = async (e) => {
        //prevent page refresh
        e.preventDefault()

        try {
            const body = { email, password, fname, lname }

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"content-type" : "application/json;charset=UTF-8"},
                mode: 'cors',
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            //document.cookie = `token=${parseRes.token}`;
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (

        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                <br/>
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} />
                <br/>
                <input type="text  " name="fname" placeholder="First Name" value={fname} onChange={e => onChange(e)} />
                <br/>
                <input type="text" name="lname" placeholder="Surname" value={lname} onChange={e => onChange(e)} />
                <br/>
                <button type="submit">Submit</button>
            </form>
            <Link to="/Login">Login</Link>
        </Fragment>
    );
}; 

export default Register;