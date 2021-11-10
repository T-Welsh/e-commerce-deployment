import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import CartLineItem from '../../components/cartLineItems/CartLineItems';

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
                setCart(items);
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
                    console.log(parseRes);
                    setCart(parseRes);
                    localStorage.setItem("cart", JSON.stringify(parseRes));
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        console.log(token);
        if(token === null){
            token = "no_token";
        }
        console.log(token);
        try {
            const response = await fetch("http://localhost:5000/checkout", {
                        method: "POST",
                        headers: {
                        //"Access-Control-Allow-Origin": "http://localhost:3000",
                        "content-type" : "text/html",
                        "token": token
                        },
                        mode: 'cors',
                    });
                    //console.log(response);
                    const parseRes = await response.json();
                    console.log(parseRes);
                    window.location.href = parseRes;
                    //localStorage.setItem("cart", JSON.stringify(parseRes));
        } catch (err) {
            console.error(err.message)
        }
    }


console.log(cart);
    return(
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <h2>Cart</h2>      
            {
                cart.length <1 ? <h3>Cart Empty</h3> : 
                (
                    <div>
                        {cart.map(element => {
                            return(
                                <CartLineItem key={element.product_id} product={element} setCart={setCart}/>
                            )
                            })
                        }
                        <button onClick={(e) => {handleClearCart(e)}}>Clear Cart</button>
                    </div> 
                )
            }
            <button onClick={(e) => {handleCheckout(e)}}>Checkout</button>
        </Fragment>
    )

}

export default Cart;