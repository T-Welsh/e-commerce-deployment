import './PasswordUpdate.css';
import { useEffect, useState } from 'react';

const PasswordUpdate = () => {
    
    const [inputs, setInputs] = useState({
        password: "",
        newPassword: "",
        repeatedPassword: ""
    });

    const [isMatch, setIsMatch] = useState(true);

    const [updateFail, setUpdateFail] = useState(false);

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
    
                const response = await fetch(`/dashboard/user/password`, {
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
                }else{
                    setUpdateFail(true);
                }
    
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    return(
        <div id='passwordUpdateContainer'>
            <div className="passwordInfo">
                <h2 className="subHeadings">Update Password</h2>
                {isMatch ? null : <p className="passwordError" >Passwords don't match</p>}
                {updateFail ? <p className="passwordError" >Password Invalid</p> : null}
                {updateSuccess ? <p id="passwordUpdate">Password Updated</p> : null}
                <form onSubmit={onSubmitForm}>
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}/>
                <input type="password" name="newPassword" placeholder="New Password" value={newPassword} onChange={e => onChange(e)}/>
                <input type="password" name="repeatedPassword" placeholder="Repeat password" value={repeatedPassword} onChange={e => onChange(e)}/>
                <button type="submit">Update Password</button>
                </form>
            </div>
        </div>
    )

}

export default PasswordUpdate;