const router = require('express').Router();
const pool = require('../db');
const findProducts = require('../middleware/findProducts');



router.get("/products", findProducts, async (req, res) => {
    try {
        products = req.products.rows;
        //console.log(path);
        res.json(products);
        //res.send(products);
    } catch (err) {
        console.error(err);
        return res.status(403).json("Not Authorised");
    }
});

router.get("/products/:id", async (req, res) => {
    try {
        const product = await pool.query("SELECT product_id, product_name, product_price, product_description, units_in_stock FROM products WHERE product_id = $1", [req.params.id]);
        const images = await pool.query("SELECT * FROM product_images WHERE product_id = $1", [req.params.id]);
        const productInfo = {
            productDetails: product.rows,
            productImages: images.rows
        }
        res.json(productInfo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;