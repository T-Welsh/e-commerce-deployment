import './CartLineItems.css';
import React, { Fragment } from 'react';

const CartLineItem = ({product, setCart}) => {

    const { REACT_APP_BACK_END_ADDRESS } = process.env;

    const handleChange = async (e) => {
        e.preventDefault();
        const changeQuantity = e.target.value - product.quantity ;
        let token = await localStorage.getItem("token");
        let cart = await JSON.parse(localStorage.getItem("cart"));
        if(cart === null){
            cart = [];
        }
        if(token === null){
            token = "no_token";
        }
        const body = {
            "productid": product.product_id,
            "quantity": changeQuantity,
            "cart": cart
        }
        try {
            const response = await fetch(`${REACT_APP_BACK_END_ADDRESS}/cart`, {
                        method: "POST",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": token
                        },
                        mode: 'cors',
                        body: JSON.stringify(body)
                    });

                    const parseRes = await response.json();
                    localStorage.setItem("cart", JSON.stringify(parseRes));
                    setCart(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleRemoveItem = async (e) => {
        e.preventDefault();
        let token = await localStorage.getItem("token");
        let cart = await JSON.parse(localStorage.getItem("cart"));
        if(cart === null){
            cart = [];
        }
        if(token === null){
            token = "no_token";
        }
        const body = {
            "productid": product.product_id,
            "quantity": product.quantity,
            "cart": cart
        }
        try {
            const response = await fetch(`${REACT_APP_BACK_END_ADDRESS}/cart`, {
                        method: "PUT",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": token
                        },
                        mode: 'cors',
                        body: JSON.stringify(body)
                    });

                    const parseRes = await response.json();
                    localStorage.setItem("cart", JSON.stringify(parseRes));
                    setCart(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }
   
    return(
        <Fragment>
            <div className="lineItem">
                <img src={`${REACT_APP_BACK_END_ADDRESS}/resources/productImages/${product.product_id}/${product.product_id}_1.jpg`} alt={product.product_name} />
                <div className="cartLineItemTextContainer">
                    <p>{product.product_name}. . .</p>
                    <p>{product.product_price}</p>
                </div>
                <div className="cartLineItemQuantityContainer">
                    <label htmlFor="quantity">Quantity. . .  </label>
                    <input type="number" className="quantity" name="quantity" min="1" value={product.quantity} onChange={(e) => {handleChange(e)}}/>
                </div>
                <button onClick={(e) => {handleRemoveItem(e)}}>Remove From Basket</button>
            </div>
        </Fragment>
    )

}

export default CartLineItem;