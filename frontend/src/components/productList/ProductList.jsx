import './productList.css'
import React, { Fragment, useEffect, useState } from 'react';
import ProductOverview from '../productOverview/ProductOverview';


const ProductList = ({searchTerm, department}) => {

    const [productInfo, setProductInfo] = useState([]);    

    useEffect(() => {
        
        const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/shop/products", {
                        method: "GET",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        "category": department,
                        "productname": searchTerm
                        },
                        mode: 'cors',
                    });

                    const parseRes = await response.json();
                    setProductInfo(parseRes);

        } catch (err) {
            console.error(err.message);
        }
        
        };
        getProducts();
    }, [searchTerm, department]);


    return(
        <Fragment>
            {productInfo.map(element => {
                return(
                    <div className="productContainer"/*style={{backgroundColor: 'lightgray'}}*/ key={element.product_id}>
                        <ProductOverview productdetails = {element} />
                    </div>
                )
            })}
        </Fragment>
    )

}

export default ProductList;