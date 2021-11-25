import './orders.css';
import React, {Fragment, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Header from "../../components/header/Header.jsx";
import Invoice from "../../components/invoice/invoice.jsx";
import Footer from "../../components/footer/Footer";


const Orders = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {
    const [invoices, setInvoices] = useState([]);
    // retrive order history from db
    useEffect(() => {
        const getOrders = async () => {
            let token = await localStorage.getItem("token");
            if(token === null){
                token = "no_token";
            }
            try {
                const response = await fetch('http://localhost:5000/orders', {
                    method: "GET",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": token
                        },
                        mode: 'cors'
                })
                const parseRes = await response.json()
                console.log(parseRes);
                setInvoices(parseRes);
            } catch (err) {
                console.error(err.message)
            }
        }
        getOrders();
    }, [])

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}  setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <body className="contentContainer">
                <div className="contentBody" id="orderHistoryBody">
                    <h2 className="subHeadings" id="orderHistorySubHdg" >Order History</h2>
                    {
                        invoices.map(element => {
                            console.log(element);
                            return(
                                <Link to={`/orders${element.invoice_id}`} className="invoiceLink">
                                <div class="invoiceContainer">
                                    <Invoice key={element.invoice_id} invoiceDetail={element}/>
                                </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </body>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default Orders;