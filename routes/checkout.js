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
            //imageURL = 'https://i.imgur.com/1NQuWpK.jpeg';
            //create lineitem
            //console.log(productId);
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
        //console.log(lineItems[0].price_data.product_data);
        //handle payment
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            metadata: {
                invoice_number: invoice.rows[0].invoice_id,
                customer: req.user,
            },
            payment_method_types : ['card'],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['GB'],
            },
            billing_address_collection: "required",
            success_url: `${YOUR_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/checkout/cancelled?session_id={CHECKOUT_SESSION_ID}`,
            //idempotencyKey: idempotencyKey
        });;
        //res.redirect(303, session.url);
        res.json(session.url)

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
        console.log(session.shipping);
        const invoiceId = session.metadata.invoice_number;
        const addressee = session.shipping.name;
        console.log(addressee);
        const add1 = session.shipping.address.line1;
        const add2 = session.shipping.address.line2;
        const add3 = session.shipping.address.city;
        const county = session.shipping.address.state;
        const postcode = session.shipping.address.postal_code;
        const total = session.amount_total/100;
        const transactionId = session.payment_intent;

        //Update invoice in db with address details, update total, mark invoice as paid, and return invoice
        try {
            const invoice = await pool.query("UPDATE invoices SET addressee = $1, delivery_address_1 = $2, delivery_address_2 = $3, delivery_address_3 = $4, delivery_county = $5, delivery_post_code = $6, invoice_total = $7, invoice_paid = true, transaction_id = $8 WHERE invoice_id = $9 RETURNING *", [addressee, add1, add2, add3, county, postcode, total, transactionId, invoiceId]);
            //clear cart
            await pool.query("DELETE FROM cart WHERE user_id = $1", [session.metadata.customer]);
            //res.json(session)
            //res.redirect('http://localhost:3000');
            res.redirect(`http://localhost:3000/orders${invoiceId}`);
            //res.redirect('http://localhost:3000/dashboard');
            //res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
        } catch (err) {
            console.error(err.message)
            res.status(500).json("Server Error");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/cancelled', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        const invoiceId = session.metadata.invoice_number;
        await pool.query("Delete FROM orders WHERE invoice_id = $1", [invoiceId]);
        await pool.query("Delete FROM invoices WHERE invoice_id = $1", [invoiceId]);
        res.redirect(`http://localhost:3000/cancelled`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;