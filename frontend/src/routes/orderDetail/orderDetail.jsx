import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import Invoice from "../../components/invoice/invoice.jsx";
import InvoiceLineItem from "../../components/invoiceLineItem/invoiceLineItem.jsx";
import Footer from "../../components/footer/Footer";


const OrderDetail = ({isAuthenticated, setAuth, setSearchTerm, setDepartment, match}) => {
    const {params: { id } } = match;
    const [invoice, setInvoice] = useState({
        invoiceDetails:{},
        lineItems: []
    });
    // retrive order history from db
    useEffect(() => {
        let token = localStorage.getItem("token");
            if(token === null){
                token = "no_token";
                window.location.href = 'http://localhost:3000';
            }
        
        const getOrder = async () => {
            
            try {
                const response = await fetch(`http://localhost:5000/orders/${id}`, {
                    method: "GET",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": token
                        },
                        mode: 'cors'
                })
                const parseRes = await response.json()
                console.log(parseRes);
                setInvoice(parseRes);
            } catch (err) {
                console.error(err.message)
            }
        }
        getOrder();
    }, [id])

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}  setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <h1>Invoice Detail</h1>
            <div>
                <Invoice invoiceDetail={invoice.invoiceDetails}/>
            </div>
            <div>
                {invoice.lineItems.map(element=> {
                    return(
                            <InvoiceLineItem key={element.product_id} id={element.product_id} element={element}/>
                    )   
                })}
            </div>
            <p>Total: {invoice.invoiceDetails.invoice_total}</p>
            <p>Status: {invoice.invoiceDetails.shipped? 'Order Shipped': 'Processing Order'}</p>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default OrderDetail;