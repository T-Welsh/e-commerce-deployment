import './UserInfo.css';
import React, {Fragment, useEffect, useState} from "react";

const { REACT_APP_BACK_END_ADDRESS } = process.env;

const UserInfo = ({setIsPassportUser}) => {
    const [user, setUser] = useState({
        email: "",
        fname: "",
        lname: "",
        address1: "",
        address2: "",
        address3: "",
        county: "",
        postcode: "",
        telephone: ""
    });

    const [ inputs, setInputs] = useState(user)
    const { email, fname, lname, address1, address2, address3, county, postcode, telephone } = inputs;

    const getUser = async () => {
        try {
            const response = await fetch(`${REACT_APP_BACK_END_ADDRESS}/dashboard/user`, {
                method: "GET",
                headers: {
                    token: localStorage.token 
                },
                mode: 'cors'
            });
            const parseRes = await response.json();
            setUser(
                {
                    email: parseRes.user_email,
                    fname: parseRes.f_name,
                    lname: parseRes.l_name,
                    address1: parseRes.address_1,
                    address2: parseRes.address_2,
                    address3: parseRes.address_3,
                    county: parseRes.county,
                    postcode: parseRes.post_code,
                    telephone: parseRes.telephone
                }
            );
            setInputs(
                {
                    email: parseRes.user_email,
                    fname: parseRes.f_name,
                    lname: parseRes.l_name,
                    address1: parseRes.address_1,
                    address2: parseRes.address_2,
                    address3: parseRes.address_3,
                    county: parseRes.county,
                    postcode: parseRes.post_code,
                    telephone: parseRes.telephone
                }
            );
            if (parseRes.google_id) {
                setIsPassportUser(true);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //console.log(user);

    const [isAddressEdit, setIsAddressEdit] = useState(false);
    const setAddressEdit = (boolean) => {
        setIsAddressEdit(boolean)
    }

    const [isPersonalEdit, setIsPersonalEdit] = useState(false);

    const setPersonalEdit = (boolean) => {
        setIsPersonalEdit(boolean)
    }

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };

    //TODO: add onSubmit function to save button
    const onSubmitForm = async (e) =>{
        e.preventDefault()
        try {
            const body = { email, fname, lname, address1, address2, address3, county, postcode, telephone }

             await fetch(`${REACT_APP_BACK_END_ADDRESS}/dashboard/user`, {
                method: "PUT",
                headers: {
                    "content-type" : "application/json;charset=UTF-8",
                    "token": localStorage.token
                },
                mode: 'cors',
                body: JSON.stringify(body)
            });

            /*const parseRes = await response.json();*/
            getUser();
            setPersonalEdit(false);
            setAddressEdit(false);

            
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return(

        <Fragment>
            <div className="userInfoContainer"> 
            {isPersonalEdit ?
                <>
                <div className="userInfo">
                    <h2 className="subHeadings" >Personal Details</h2>
                    <form className="userInfoForm" onSubmit={onSubmitForm}>
                        <input type="text  " name="fname" placeholder="First Name" value={fname} onChange={e => onChange(e)} />
                        <input type="text" name="lname" placeholder="Surname" value={lname} onChange={e => onChange(e)} />
                        <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                        <input type="text  " name="telephone" placeholder="Phone Number" value={telephone} onChange={e => onChange(e)} />
                        <button type='submit'>Save</button>
                    </form>
                </div>
                </>
            :
                <>
                <div className="userInfo">
                    <h2 className="subHeadings" >Personal Details</h2>
                    <p>{user.fname}</p>
                    <p>{user.lname}</p>
                    <p>{user.email}</p>
                    <p>{user.telephone}</p>
                    <button className="userInfoEditBtn" onClick={() => { setPersonalEdit(true);} }>Edit Details</button>
                </div>
                </>
            }
            {isAddressEdit ? 
                <>
                <div className="userInfo">
                    <h2 className="subHeadings">Address</h2>
                    <form  className="userInfoForm" onSubmit={onSubmitForm}>
                        <input type="text" name="address1" placeholder="address1" value={address1} onChange={e => onChange(e)} />
                        <input type="text  " name="address2" placeholder="address2" value={address2} onChange={e => onChange(e)} />
                        <input type="text" name="address3" placeholder="address3" value={address3} onChange={e => onChange(e)} />
                        <input type="text" name="county" placeholder="county" value={county} onChange={e => onChange(e)} />
                        <input type="text" name="postcode" placeholder="postcode" value={postcode} onChange={e => onChange(e)} />
                        <button type='submit'>Save</button>
                    </form>
                </div>
                </>
            :
                <>
                <div className="userInfo">
                    <h2 className="subHeadings">Address</h2>
                    <p>{user.address1}</p>
                    <p>{user.address2}</p>
                    <p>{user.address3}</p>
                    <p>{user.county}</p>
                    <p>{user.postcode}</p>
                    <button className="userInfoEditBtn" onClick={() => { setAddressEdit(true); getUser()} }>Edit Details</button>
                </div>
                </>
            }
            </div>
        </Fragment>
    )
 
}

export default UserInfo;