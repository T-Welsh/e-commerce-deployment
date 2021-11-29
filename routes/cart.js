const router = require('express').Router();
require('dotenv').config();
const pool = require('../db');
const authcheck = require('../middleware/authcheck');
const authorization = require("../middleware/authorization");


const YOUR_DOMAIN = `http://localhost:${process.env.PORT}`;

//get cart items
router.get("/", authorization, async (req, res) => {
    try {
        const cartItems = await pool.query("SELECT cart.product_id, quantity, product_name, product_price, product_description FROM cart JOIN products ON cart.product_id = products.product_id WHERE user_id = $1", [req.user]);
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
/*
router.post("/checkout", authcheck, authorization, async (req, res) => {
    try {
        //destructure delivery details
        const { addressee, add1, add2, add3, county, postcode } = req.body;
        let invoiceTotal = 0;
        let stripeToken = req.body;
        let lineItems = [];
        const idempotencyKey = uuidv4();
/*
        //retrive cart items from db
        const orderItems = await pool.query("SELECT * FROM cart WHERE user_id = $1", [req.user]);
        if(orderItems.rowCount <= 0){
            return res.status(406).send("no items in cart");
        }
        //check item are in stock
        for (i=0; i<orderItems.rowCount; i++){
            const product =  await pool.query("SELECT * FROM products WHERE product_id = $1", [orderItems.rows[i].product_id]);
            if(orderItems.rows[i].quantity > product.rows[0].units_in_stock){
                return res.status(409).send(`Insufficient Stock: -${product.rows[0].product_name}`);
            }
        }
*/       
/* 
        //create new invoice in db
        let invoice = await pool.query("INSERT INTO invoices (customer_id, addressee, delivery_address_1, delivery_address_2, delivery_address_3, delivery_county, delivery_post_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [req.user, addressee, add1, add2, add3, county, postcode]);
*/        
/*
        //create orders in db
        for (i=0; i<orderItems.rowCount; i++){
            const product = await (pool.query("SELECT product_name, product_description, CAST(product_price AS NUMERIC(10,4)) FROM products WHERE product_id = $1", [orderItems.rows[i].product_id]));
            await pool.query("INSERT INTO orders (product_id, order_quantity, invoice_id, unit_price) VALUES ($1, $2, $3, $4)", [orderItems.rows[i].product_id, orderItems.rows[i].quantity, invoice.rows[0].invoice_id, product.rows[0].product_price]);
            //calculat invoice total
            invoiceTotal = invoiceTotal + (product.rows[0].product_price * orderItems.rows[i].quantity);
            //get product image for cart
            imageURL = `${YOUR_DOMAIN}/productImages/${orderItems.rows[i].product_id}/${orderItems.rows[i].product_id}_1.jpg`
            lineItems.push(
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: product.rows[0].product_name,
                            description: product.rows[0].product_desription,
                            images: [imageURL],
                            metadata: {
                                product_id: orderItems.rows[i].product_id
                            },
                        }, 
                        unit_amount_decimal: Math.trunc(product.rows[0].product_price * 100),
                        tax_behavior: "inclusive"
                    },
                    quantity: orderItems.rows[i].quantity
                },
            );
        }
*/   
/*     
        //set invoice total
        invoice = await pool.query("UPDATE invoices SET invoice_total = $1 WHERE invoice_id = $2 RETURNING *", [invoiceTotal, invoice.rows[0].invoice_id]);
        //delete ordered items from cart
        await pool.query("DELETE FROM cart WHERE user_id = $1", [req.user]);
*/
/*
        //handle payment
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            metadata: {
                invoice_number: invoice.rows[0].invoice_id,
            },
            payment_method_types : ['card'],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
            //idempotencyKey: idempotencyKey
        });

        res.redirect(303, session.url);
*/        
/*
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error"); 
    }

    router.get("/success", (req, res) => {
        res.send('payment successfull')
    });

    router.get("/cancel", (req, res) => {
        res.send('payment cancelled')
    })
});
*/
module.exports = router;