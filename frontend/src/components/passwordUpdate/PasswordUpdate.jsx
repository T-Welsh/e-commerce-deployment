import { useEffect, useState } from 'react';

const PasswordUpdate = () => {
    
    const [inputs, setInputs] = useState({
        password: "",
        newPassword: "",
        repeatedPassword: ""
    });

    const [isMatch, setIsMatch] = useState(true);

    const [updateSuccess, setUpdateSuccess] = useState(false);

    const {password, newPassword, repeatedPassword} = inputs;

    const checkMatch = () => {
        if(newPassword !== repeatedPassword){
            setIsMatch(false)
        }
        if(newPassword === repeatedPassword){
            setIsMatch(true)
        }
    }

    useEffect(() => {
        checkMatch();
    })

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };

    const onSubmitForm = async (e) => {
        //prevent page refresh
        e.preventDefault()

        if(newPassword !== repeatedPassword) {
            console.log("passwords don't match");
        }else{
            try {
                const body = {
                    oldPassword: password,
                    password: newPassword
                }
    
                const response = await fetch("http://localhost:5000/dashboard/user/password", {
                    method: "PUT",
                    headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        token: localStorage.token 
                    },
                    mode: 'cors',
                    body: JSON.stringify(body)
                });
    
                const parseRes = await response.json();
                if(parseRes === "Password Updated"){
                    setUpdateSuccess(true);
                }
    
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    return(
        <div id='passwordUpdateContainer'>
            <h2>Update Password</h2>
            <form onSubmit={onSubmitForm}>
            <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}/>
            <br/>
            <input type="password" name="newPassword" placeholder="New Password" value={newPassword} onChange={e => onChange(e)}/>
            <br/>
            <input type="password" name="repeatedPassword" placeholder="Repeat password" value={repeatedPassword} onChange={e => onChange(e)}/>
            <br/>
            <button type="submit">Update Password</button>
            {isMatch ? null : <p>passwords don't match</p>}
            {updateSuccess ? <p>Password Updated</p> : null}
            </form>
        </div>
    )

}

export default PasswordUpdate;