import React, { Fragment } from 'react';

const Invoice = ({invoiceDetail}) => {

    return(
        <Fragment>
            <p>invoice</p>
            <p>{invoiceDetail.invoice_date}</p>
            <p>{invoiceDetail.addressee}</p>
            <p>{invoiceDetail.delivery_address_1}</p>
            <p>{invoiceDetail.delivery_address_2}</p>
            <p>{invoiceDetail.delivery_address_3}</p>
        </Fragment>
    )

}

export default Invoice;