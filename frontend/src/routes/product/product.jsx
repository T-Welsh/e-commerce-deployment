import './product.css';
import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { NavLink } from "react-router-dom";

const Product = ({isAuthenticated, setAuth, match, department, setSearchTerm, setDepartment }) => {
    const {params: { id } } = match;
    const [product, setProduct] = useState(
        {
            "productDetails": [
                {
                    "product_id": "",
                    "product_name": "",
                    "product_price": "",
                    "product_description": "",
                    "units_in_stock": ""
                }
            ],
            "productImages": [
                {
                    "image_id": "",
                    "product_id": "",
                    "image_address": ""
                }              
            ]
            
        }
    );

    const [image, setImage] = useState(product.productImages[0].image_address);

    const handleImageClick = (address) => {
        setImage(address);
    }

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const initPage = async () => {
            const getProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/shop/products/${id}`, {
                            method: "GET",
                            headers: {
                            "content-type" : "application/json;charset=UTF-8",
                            },
                            mode: 'cors',
                        });

                        const parseRes = await response.json();
                        setProduct(parseRes);
                        setImage(parseRes.productImages[0].image_address);
                        //console.log(parseRes);

            } catch (err) {
                console.error(err.message);
            }
            
            };
            await getProducts().then(
            ); 
        }
        initPage();
    }, [id]);

    const addCart = async (e) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.getItem("cart"));

        if(cart === null){
            cart = [];
        }

        try {
            const body = {
                "productid": id,
                "quantity": quantity,
                "cart": cart
            }

            const response = await fetch("http://localhost:5000/cart", {
                        method: "POST",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "token": localStorage.getItem("token")
                        },
                        mode: 'cors',
                        body: JSON.stringify(body)
                    });

                    const parseRes = await response.json();
                    localStorage.setItem("cart", JSON.stringify(parseRes));

        } catch (err) {
            console.error(err.message);
        }
    }

    const onChange = (e) => {
        const intValue = parseInt(e.target.value)
        setQuantity(intValue);
    }

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <body className="contentContainer" >
                <div className="contentBody" id="productBody">
                    <NavLink to="/home" id="shopPath"><h2 className="subHeadings" >&#x22D8;{department === '' ? `Back to All Departments`: `Back to ${department}`}</h2></NavLink>
                    <section id="productInfoContainer">
                        <div id="productBodyA">
                        <img src={image} alt={product.productDetails[0].product_name} id="productImage"/>
                        <div id="productBodyB">
                            <div id="namePrice">
                                <p>{product.productDetails[0].product_name}. . .</p>
                                <p>{product.productDetails[0].product_price}</p>
                            </div>
                            <div id='addBasket'>
                                <label htmlFor="quantity">Quantity:</label>
                                <div>
                                    <select name="quantity" id="quantity" onChange={e => onChange(e)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <button id="addCartBtn" onClick={e => addCart(e)}>Add to Cart</button>
                                </div>
                            </div>
                            <p id="productDescription">{product.productDetails[0].product_description}</p>
                        </div>
                        </div>
                        <div id="productBodyC">
                            <div id="imageList">
                                {product.productImages.map(element => {
                                    return(
                                            <img key={element.image_id} class="imagePreview" src={element.image_address} alt={product.productDetails[0].product_name} onClick={()=>{handleImageClick(element.image_address)}}/>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </body>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default Product;