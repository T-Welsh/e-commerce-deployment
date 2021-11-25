import './cart.css';
import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import CartLineItem from '../../components/cartLineItems/CartLineItems';
import Footer from "../../components/footer/Footer";

const Cart = ({ isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    const [cart, setCart] = useState(
        [
            {
                "product_id": 0,
                "quantity": 0,
                "product_name": "",
                "product_price": "",
                "product_description": ""
            }
        ]
    );

    let token = localStorage.getItem("token");

    useEffect(() => {
        const getCart = async() => {
            if(isAuthenticated){
                let token = await localStorage.getItem("token");
                try {
                    const response = await fetch("http://localhost:5000/cart", {
                        method: "GET",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": token
                        },
                        mode: 'cors',
                    });
                    const parseRes = await response.json();
                        setCart(parseRes);
                } catch (err) {
                    console.error(err.message);
                }
            }else{
                const items = await JSON.parse(localStorage.getItem('cart'))
                if (/*items === null || items === "Not Authorised"*/ typeof(items) === 'object' && items !== null) {
                    //setCart([])
                    setCart(items);
                }else{
                    //setCart(items);
                    setCart([])
                }
                
            }
            
        }
        getCart();
    }, [isAuthenticated])

    const handleClearCart = async (e) => {
        e.preventDefault();
        let token = await localStorage.getItem("token");
        if(token === null){
            token = "no_token";
        }
        try {
            const response = await fetch("http://localhost:5000/cart", {
                        method: "DELETE",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": token
                        },
                        mode: 'cors',
                    });
                    const parseRes = await response.json();
                    setCart(parseRes);
                    localStorage.setItem("cart", JSON.stringify(parseRes));
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        if(!isAuthenticated){
            return window.location.href = "http://localhost:3000/login";
        }
        try {
            const response = await fetch("http://localhost:5000/checkout", {
                        method: "POST",
                        headers: {
                        "content-type" : "text/html",
                        "token": token
                        },
                        mode: 'cors',
                    });
                    const parseRes = await response.json();
                    window.location.href = parseRes;
                    //localStorage.setItem("cart", JSON.stringify(parseRes));
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <body className="contentContainer" id='cartContainer'>
                <div className="contentBody" id="cartBody">
                    <h2 className="subHeadings" id="cartSubHdg">Your Basket</h2>      
                    {
                        cart.length <1 ? 
                            <div id="cartItemsContainer">
                                <p id={"cartEmptyMessage"}>Cart Empty</p>
                            </div> : 
                        (
                            <div id="cartItemsContainer">
                                {cart.map(element => {
                                    return(
                                        <CartLineItem key={element.product_id} product={element} setCart={setCart}/>
                                    )
                                    })
                                }
                                <div id="cartBtnContainer">
                                    <button onClick={(e) => {handleClearCart(e)}}>Clear Cart</button>
                                </div>
                            </div> 
                        )
                    }
                    <button id="checkoutBtn" onClick={(e) => {handleCheckout(e)}}>Checkout</button>
                </div>
            </body>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    )

}

export default Cart;