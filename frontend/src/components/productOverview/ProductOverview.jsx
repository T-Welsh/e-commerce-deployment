import './ProductOverview.css';
import React, { Fragment } from 'react';

const ProductOverview = (productDetails) => {

    const { REACT_APP_BACK_END_ADDRESS } = process.env;

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

        if(cart === null || cart === "Not Authorised"){
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

            const response = await fetch(`/cart`, {
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
                <img src={`/productImages/${id}/${id}_1.jpg`} alt={name} className="productListImg" />
                <div className="nameAndPriceContainer">
                    <h3 className="productListName">{name}. . .</h3>
                    <p className="productListPrice">{price}</p> 
                </div>
            <button className="addCartBtn" onClick={e => addCart(e)}>Add to Basket... <i class="bi bi-bag-check-fill"></i></button>
        </Fragment>
    )

}

export default ProductOverview;
