CREATE DATABASE ecommerce;

--create users table
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    f_name VARCHAR(50) NOT NULL,
    L_name VARCHAR(50) NOT NULL,
    address_1 VARCHAR(255) NOT NULL,
    address_2 VARCHAR(255),
    address_3 VARCHAR(255),
    county VARCHAR(100) NOT NULL,
    post_code VARCHAR(8) NOT NULL,
    telephone VARCHAR(14)
);

--create suppliers table
CREATE TABLE suppliers(
    supplier_id SMALLSERIAL PRIMARY KEY,
    supplier_name VARCHAR(255) NOT NULL,
    supplier_contact VARCHAR(100),
    supplier_phone VARCHAR(14),
    supplier_email VARCHAR(255),
    address_1 VARCHAR(255),
    address_2 VARCHAR(255),
    address_3 VARCHAR(255),
    county VARCHAR(100),
    post_code VARCHAR(8)
);

--Create products table
CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price MONEY NOT NULL,
    product_description TEXT,
    product_category VARCHAR(255),
    units_in_stock INTEGER NOT NULL,
    supplier_id SMALLSERIAL REFERENCES suppliers(supplier_id) ON DELETE SET NULL ON UPDATE CASCADE
);

--Create cart table
CREATE TABLE cart(
    user_id UUID REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    product_id SERIAL REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    quantity INTEGER,
    PRIMARY KEY (user_id, product_id)
);

--Create invoices table
CREATE TABLE invoices(
    invoice_id SERIAL PRIMARY KEY,
    invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id UUID REFERENCES users(user_id),
    addressee VARCHAR(255),
    delivery_address_1 VARCHAR(255),
    delivery_address_2 VARCHAR(255),
    delivery_address_3 VARCHAR(255),
    delivery_county VARCHAR(100),
    delivery_post_code VARCHAR(8),
    invoice_total MONEY NOT NULL,
    invoice_paid BOOLEAN NOT NULL DEFAULT false,
    shipped BOOLEAN NOT NULL DEFAULT false
);

--Create orders table
CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    order_quantity INTEGER NOT NULL,
    invoice_id INTEGER NOT NULL REFERENCES invoices(invoice_id),
    unit_price MONEY NOT NULL
);

--create product_images table
CREATE TABLE product_images(
    image_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    image_address VARCHAR
);