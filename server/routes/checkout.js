const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pool = require('../db');
const authcheck = require('../middleware/authcheck');
const authorization = require("../middleware/authorization");
const stockcheck = require('../middleware/stockcheck');
const { v4: uuidv4} = require('uuid'); 

const YOUR_DOMAIN = `http://localhost:${process.env.PORT}`;

router.post("/", authcheck, authorization, stockcheck, async (req, res) => {
    try {
        const orderItems = req.orderItems;
        let invoiceId;
        let lineItems = [];
        const idempotencyKey = uuidv4();
        //create new invoice in db
        let invoice = await pool.query("INSERT INTO invoices (customer_id) VALUES ($1) RETURNING *", [req.user]);
        invoiceId = invoice.rows[0].invoice_id;

        //create orders in db
        for (i=0; i<orderItems.length; i++){
            const product = await (pool.query("SELECT product_name, product_description, CAST(product_price AS NUMERIC(10,4)) FROM products WHERE product_id = $1", [orderItems[i].product_id]));
            const productId = orderItems[i].product_id;
            const productName = product.rows[0].product_name;
            const description = product.rows[0].product_description;
            const price = product.rows[0].product_price;
            const quantity = orderItems[i].quantity;
            //insert new order into db
            await pool.query("INSERT INTO orders (product_id, order_quantity, invoice_id, unit_price) VALUES ($1, $2, $3, $4)", [productId, quantity, invoiceId, price]);
            //get product image for cart
            imageURL = `${YOUR_DOMAIN}/productImages/${productId}/${productId}_1.jpg`
            //create lineitem
            console.log(productId);
            lineItems.push(
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: productName,
                            description: description,
                            images: [imageURL],
                            metadata: {
                                product_id: productId
                            },
                        }, 
                        unit_amount_decimal: Math.trunc(price * 100),
                        tax_behavior: "inclusive",
                    },
                    quantity: quantity
                },
            );
        }
        console.log(lineItems);
        //handle payment
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            metadata: {
                invoice_number: invoice.rows[0].invoice_id,
            },
            payment_method_types : ['card'],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['GB'],
            },
            billing_address_collection: "required",
            success_url: `${YOUR_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/checkout/cancel`,
            //idempotencyKey: idempotencyKey
        });

        res.redirect(303, session.url);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get('/success', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        const customer = await stripe.customers.retrieve(session.customer);
        console.log(session.metadata);
        res.json(session)
        //res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('there was an error')
    }
});

module.exports = router;