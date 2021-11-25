import './invoice.css';
import React, { Fragment } from 'react';

const Invoice = ({invoiceDetail}) => {

    return(
        <Fragment>
            <div className="invoice">
                <div className="invNumberContainer">
                    <p className="invoiceNumber" >Invoice No. . . . </p>
                    <p className="invoiceNumber" >{invoiceDetail.invoice_id}</p>
                </div>
                <div className="invDateContainer">
                    <p className="invoiceDate" >Invoice Date. . . </p>
                    <p className="invoiceDate" >{!invoiceDetail.invoice_date ? null : invoiceDetail.invoice_date.slice(0, 10)}</p>
                </div>
                <div className="deliveryContainer">
                    <p className="invHeading" >Delivery Address: </p>
                    <p className="invoiceData">{invoiceDetail.addressee}</p>
                    <p className="invoiceData">{invoiceDetail.delivery_address_1}</p>
                    {!invoiceDetail.delivery_address_2 ? null : <p className="invoiceData" >{invoiceDetail.delivery_address_2}</p>}
                    {!invoiceDetail.delivery_address_3 ? null : <p className="invoiceData" >{invoiceDetail.delivery_address_3}</p>}
                </div>
                <p className="invDetails">...Details</p>
            </div>
        </Fragment>
    )

}

export default Invoice;