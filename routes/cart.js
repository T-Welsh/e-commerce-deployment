const router = require('express').Router();
require('dotenv').config();
const pool = require('../db');
const authorization = require("../middleware/authorization");

//get cart items
router.get("/", authorization, async (req, res) => {
    try {
        const cartItems = await pool.query("SELECT cart.product_id, quantity, product_name, product_price, product_description FROM cart JOIN products ON cart.product_id = products.product_id WHERE user_id = $1", [req.user]);
        cartItems.rows.sort((a, b) => parseFloat(a.product_id) - parseFloat(b.product_id));
        res.json(cartItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");  
    }
});

//add item to cart
router.post("/", authorization, async (req, res) => {    
    try {
        //destructure request body
        const loggedIn = req.loggedIn;
        const { productid, quantity, cart, productname, price } = req.body;
        if(loggedIn === false){
            //create object for new cart item
            const cartItem = {
                product_id: productid,
                quantity: quantity,
                product_name: productname, 
                product_price: price
            }
            //check if new item is already in cart
            let productExists = false;
            cart.forEach(element => {
                //if item is already in cart then update quantity
                if(element.product_id === productid){
                    element.quantity = element.quantity + quantity;
                    productExists = true;
                    res.status(200).json(cart);
                }
            });
            //if new item is not in cart, then add it to cart
            if(productExists === false){
                cart.push(cartItem);
                res.status(200).json(cart);
            }
        }else{
            //check if item is already in cart
            const cartItems = await pool.query("SELECT * FROM cart WHERE user_id = $1 AND product_id = $2", [req.user, productid,]);
            //if item already in cart the update quantity
            if(cartItems.rows.length >= 1){
                await pool.query("UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING product_id, quantity", [quantity, req.user, productid]);
                const updatedcart = await pool.query("SELECT cart.product_id, quantity, product_name, product_price FROM cart JOIN products ON cart.product_id = products.product_id WHERE user_id = $1", [req.user]);
                //const updatedcart = await pool.query("SELECT product_id, quantity FROM cart WHERE user_id = $1", [req.user]);
                return res.status(200).json(updatedcart.rows);
            }
            // if item not already in the cart then add item to cart
            await pool.query("INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)", [req.user, productid, quantity]);
            const newcart = await pool.query("SELECT product_id, quantity FROM cart WHERE user_id = $1", [req.user]);
            res.status(200).json(newcart.rows);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");  
    }
});

//remove item from cart
router.put("/", authorization, async (req, res) => {
    try {
        const loggedIn = req.loggedIn;
        const { productid, quantity, cart} = req.body;
        if(loggedIn === false){
            //reduce quantity of product in cart, delete if new quantity is 0
            for(let i = 0; i < cart.length; i++){
                if(cart[i].product_id === productid){
                    cart[i].quantity = cart[i].quantity - quantity;
                    if(cart[i].quantity < 1){
                        cart.splice(i, 1);
                    }
                res.json(cart); 
                }
            }
        }else{
            const cartItems = await pool.query("SELECT * FROM cart WHERE user_id = $1 AND product_id = $2", [req.user, productid,]);
            const quantInCart = cartItems.rows[0].quantity;
            //reduce quantity in cart
            if(quantInCart > quantity){
                await pool.query("UPDATE cart SET quantity = quantity - $1 WHERE user_id = $2 AND product_id = $3", [quantity, req.user, productid]);
            }else{
                //delete product from cart 
                await pool.query("DELETE FROM cart WHERE user_id = $1 AND product_id = $2", [req.user, productid,])
            }
            const updatedcart = await pool.query("SELECT cart.product_id, quantity, product_name, product_price, product_description FROM cart JOIN products ON cart.product_id = products.product_id WHERE user_id = $1", [req.user]);
            //const updatedcart = await pool.query("SELECT product_id, quantity FROM cart WHERE user_id = $1", [req.user]);
                return res.status(200).json(updatedcart.rows);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error"); 
    }
});

//clear cart
router.delete("/", authorization, async(req, res) => {
    const cart = [];
    try {
        const loggedIn = req.loggedIn;
        if(loggedIn === false){
            res.status(200).json(cart);
        }else{
            await pool.query("DELETE FROM cart WHERE user_id = $1", [req.user]);
            res.status(200).json(cart);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error"); 
    }
});

module.exports = router;