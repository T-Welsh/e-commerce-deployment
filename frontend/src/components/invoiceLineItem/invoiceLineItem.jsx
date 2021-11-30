import "./invoiceLineItem.css";
import React, {Fragment, useEffect, useState} from "react";

const InvoiceLineItem = ({id, element}) => {

    const [item, setItem] = useState(
        {
            productDetails: [
                {
                    product_id: 0,
                    product_name: "",
                    product_price: "£00.00",
                    product_description: "",
                    units_in_stock: 0
                }
            ],
            productImages: [
                {
                    image_id: 0,
                    product_id: 0,
                    image_address: "/productImages/0/0_2.jpg"
                }
            ]
        }
    );
    // retrive order history from db
    useEffect(() => {
        const getItem = async () => {
            let token = await localStorage.getItem("token");
            if(token === null){
                token = "no_token";
            }
            try {
                const response = await fetch(`/shop/products/${id}`, {
                    method: "GET",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": token
                        },
                        mode: 'cors'
                })
                const parseRes = await response.json()
                setItem(parseRes);
            } catch (err) {
                console.error(err.message)
            }
        }
        getItem();
    }, [id])

    return (
        <Fragment>
            <div className="invoiceLineItemContainer">
                <img src={`/productImages/${id}/${id}_1.jpg`} alt={item.productDetails[0].product_name} />
                <div className="invLineItemTextContainer">
                    <p>{item.productDetails[0].product_name}</p>
                    <p>Quantity: {element.order_quantity}</p>
                    <p>Line Total: £{element.order_quantity * parseFloat(element.unit_price.slice(1))}</p>
                </div>
                
            </div>
        </Fragment>
    );
}; 

export default InvoiceLineItem;