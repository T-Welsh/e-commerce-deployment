const router = require('express').Router();
require('dotenv').config();
const pool = require('../db');
const authcheck = require('../middleware/authcheck');
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        const orders = await pool.query("SELECT invoice_id, invoice_date, addressee, delivery_address_1, delivery_address_2, delivery_address_3, delivery_county, delivery_post_code, invoice_total, shipped FROM invoices WHERE customer_id = $1", [req.user]);
        res.json(orders.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error"); 
    }
})

router.get("/:id", authorization, async (req, res) => {
    try {
        const invoice = await pool.query("SELECT invoice_id, invoice_date, addressee, delivery_address_1, delivery_address_2, delivery_address_3, delivery_county, delivery_post_code, invoice_total, shipped FROM invoices WHERE invoice_id = $1", [req.params.id]);
        const lineItems = await pool.query("SELECT * FROM orders WHERE invoice_id = $1", [req.params.id]);
        const order = {
            invoiceDetails: invoice.rows[0],
            lineItems: lineItems.rows
        }
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;