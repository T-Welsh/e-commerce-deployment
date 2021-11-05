import React, { Fragment, useEffect, useState } from 'react';
import ProductOverview from '../productOverview/ProductOverview';


const ProductList = () => {

    const [productInfo, setProductInfo] = useState([]);    

    useEffect(() => {
        
        const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/shop/products", {
                        method: "GET",
                        headers: {
                        "content-type" : "application/json;charset=UTF-8",
                        },
                        mode: 'cors',
                    });

                    const parseRes = await response.json();
                    setProductInfo(parseRes);
                    console.log(parseRes);

        } catch (err) {
            console.error(err.message);
        }
        
        };
        getProducts();
    }, []);


    return(
        <Fragment>
            {productInfo.map(element => {
                return(
                    <div style={{backgroundColor: 'lightgray'}}>
                        <ProductOverview productdetails = {element} />
                    </div>
                )
            })}
        </Fragment>
    )

}

export default ProductList;