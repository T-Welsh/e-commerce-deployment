import React, {Fragment, useState} from "react";

const Register = () => {
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

    const onSUbmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { email, password, fname, lname }
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (

        <Fragment>
            <h1>Register</h1>
            <form onSubmit={onSUbmitForm}>
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
        </Fragment>
    );
}; 

export default Register;