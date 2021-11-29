import './orderDetail.css';
import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import Invoice from "../../components/invoice/invoice.jsx";
import InvoiceLineItem from "../../components/invoiceLineItem/invoiceLineItem.jsx";
import Footer from "../../components/footer/Footer";


const OrderDetail = ({isAuthenticated, setAuth, setSearchTerm, setDepartment, match}) => {

    const { REACT_APP_BACK_END_ADDRESS } = process.env;

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
                window.location.href = '/';
            }
        
        const getOrder = async () => {
            
            try {
                const response = await fetch(`${REACT_APP_BACK_END_ADDRESS}/orders/${id}`, {
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
    }, [REACT_APP_BACK_END_ADDRESS, id])

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}  setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <body className="contentContainer">
                <div className="contentBody" id="invoiceDetailBody">
                    <div id="invCompContainer">
                        <Invoice invoiceDetail={invoice.invoiceDetails}/>
                    </div>
                    <div id="lineItemsContainer">
                        {invoice.lineItems.map(element=> {
                            return(
                                    <InvoiceLineItem key={element.product_id} id={element.product_id} element={element}/>
                            )   
                        })}
                    </div>
                    <p className="invStatusText" >Total: {invoice.invoiceDetails.invoice_total}</p>
                    <p className="invStatusText" >Status: {invoice.invoiceDetails.shipped? 'Order Shipped': 'Processing Order'}</p>
                </div>
            </body>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default OrderDetail;