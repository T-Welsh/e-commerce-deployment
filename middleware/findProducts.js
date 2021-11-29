const pool = require("../db");

module.exports = async (req, res, next) => {
    try {
        const { category, productname } = req.headers;
        let products;
        if(category !== "" && category !== null && category !== undefined){
            if(productname !== ""){
                products = await pool.query("SELECT product_id, product_name, product_price, product_description, units_in_stock FROM products WHERE product_category ~* $1 AND product_name ~* $2", [req.header("category"), req.header("productname")]);
            }else{
                products = await pool.query("SELECT product_id, product_name, product_price, product_description, units_in_stock FROM products WHERE product_category ~* $1", [req.header("category")]);
            }
        }else if(productname !== "" && productname !== null && productname !== undefined){
            products = await pool.query("SELECT product_id, product_name, product_price, product_description, units_in_stock FROM products WHERE product_name ~* $1", [req.header("productname")]);
        }else {
            products = await pool.query("SELECT product_id, product_name, product_price, product_description, units_in_stock FROM products");
        }

        products.rows.forEach(product => {
            const productId = product.product_id;
            //attach imageURL to product
            product.imageURL = `/resources/productImages/${productId}/${productId}_1.jpg`
        });

        req.products = products;
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    console.log('end of middleware');
    next();
}