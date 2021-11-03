import React, {Fragment, useEffect, useState} from "react";

const UserInfo = () => {
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

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/user", {
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
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUser();
    }, [])
    //console.log(user);

    const [isEdit, setIsEdit] = useState(false);

    const setEdit = (boolean) => {
        setIsEdit(boolean)
    }

    return(

        <Fragment>
            {isEdit ? 
                <>
                <p>Edit form</p>
                <button onClick={() => { setEdit(false); } }>Edit Details</button>
                </>
            :
                <>
                <h1>Dashboard</h1><div>
                    <h2>Personal Details</h2>
                    <p>{user.fname}</p>
                    <p>{user.lname}</p>
                    <p>{user.email}</p>
                    <p>{user.telephone}</p>
                </div>
                <div>
                    <h2>Address</h2>
                    <p>{user.address1}</p>
                    <p>{user.address2}</p>
                    <p>{user.address3}</p>
                    <p>{user.county}</p>
                    <p>{user.postcode}</p>
                </div>
                <button onClick={() => { setEdit(true); } }>Edit Details</button>
                </>
            }
            <h1>Dashboard</h1><div>
                <h2>Personal Details</h2>
                <p>{user.fname}</p>
                <p>{user.lname}</p>
                <p>{user.email}</p>
                <p>{user.telephone}</p>
            </div>
            <div>
                <h2>Address</h2>
                <p>{user.address1}</p>
                <p>{user.address2}</p>
                <p>{user.address3}</p>
                <p>{user.county}</p>
                <p>{user.postcode}</p>
            </div>
            <button onClick={()=> {setEdit(true)}}>Edit Details</button>
        </Fragment>
    )
 
}

export default UserInfo;