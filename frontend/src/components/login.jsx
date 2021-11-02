import React, {Fragment, useState} from "react";


const Login = ({setAuth}) => {

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

            const response = await fetch("http://localhost:5000/auth/login", {
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
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                <br/>
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </Fragment>
    );
}; 

export default Login;