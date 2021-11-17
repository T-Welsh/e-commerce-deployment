import React, { Fragment } from 'react';

const CartLineItem = ({product, setCart}) => {

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
            const response = await fetch("http://localhost:5000/cart", {
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
            const response = await fetch("http://localhost:5000/cart", {
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
            <div style={{display: 'flex'}}>
                <img src={`http://localhost:5000/productImages/${product.product_id}/${product.product_id}_1.jpg`} alt={product.product_name} style={{maxWidth: "60px", maxHeight: "60px"}}/>
                <p>{product.product_name}</p>
                <p>{product.product_price}</p>
                <input type="number" id="quantity name="quantity min="1" value={product.quantity} onChange={(e) => {handleChange(e)}}/>
                <button onClick={(e) => {handleRemoveItem(e)}}>Remove Item</button>
            </div>
        </Fragment>
    )

}

export default CartLineItem;