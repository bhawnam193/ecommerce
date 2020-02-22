import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ProductCard from './ProductCard';
import { read } from './apiCore';

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId)
            .then(data => {
                if (data.errors) {
                    setError(data.errors);
                } else {
                    setProduct(data.product);
                }
            });
    };

    useEffect(() => {
        const productId = props.match.params.productId;

        loadSingleProduct(productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)}>
        	<div className="row">
        		{product && <ProductCard  product={product}/>}
        	</div>
        </Layout>
    )
}

export default Product;