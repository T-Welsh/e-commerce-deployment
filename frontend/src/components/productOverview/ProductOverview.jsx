import React, { Fragment, useEffect, useState } from 'react';

const ProductOverview = (productDetails) => {

    const id = productDetails.productdetails.product_id;
    const name = productDetails.productdetails.product_name;
    const price = productDetails.productdetails.product_price;
    let token = localStorage.getItem("token");
    //const imageURL = productDetails.productdetails.imageURL;
    //"https://i.imgur.com/1NQuWpK.jpeg"
    //`/productImages/${id}/${id}_1.jpg`   frontend image address

    const addCart = async (e) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.getItem("cart"));

        if(cart === null){
            cart = [];
        }

        try {
            const body = {
                "productid": id,
                "productname" : name,
                "price" : price,
                "quantity":1,
                "cart": cart
            }
            if(token === null){
                token = "no_token";
            }

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

        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
                <img src={`http://localhost:5000/productImages/${id}/${id}_1.jpg`} alt={name} style={{maxWidth: "100px", maxHeight: "100px"} }/>
                <h3>{name}</h3>
                <p>{price}</p>
            <button onClick={e => addCart(e)}>Add to Cart</button>
        </Fragment>
    )

}

export default ProductOverview;