const pool = require('../db');

module.exports = async (req, res, next) => {
    //retrive cart items from db
    const orderItems = await pool.query("SELECT * FROM cart WHERE user_id = $1", [req.user]);
    if(orderItems.rowCount <= 0){
        return res.status(406).json("no items in cart");
    }
    //check item are in stock
    for (i=0; i<orderItems.rowCount; i++){
        const product =  await pool.query("SELECT * FROM products WHERE product_id = $1", [orderItems.rows[i].product_id]);
        if(orderItems.rows[i].quantity > product.rows[0].units_in_stock){
            return res.status(409).send(`Insufficient Stock: -${product.rows[0].product_name}`);
        }
    }
    req.orderItems = orderItems.rows;
    return next();
}