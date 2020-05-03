import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import { read, relatedProducts } from './apiCore';
import { API } from '../config';
import * as moment from "moment/moment.js"
import ProductCard from './ProductCard';

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [related, setRelated] = useState([]);

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

    const loadRelatedProducts = productId => {
        relatedProducts(productId)
            .then(data => {
                if (data.errors) {
                    setError(data.errors);
                } else {
                    setRelated(data.result);
                }
            });
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        loadRelatedProducts(productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const showProduct = () => {
        if (Object.entries(product).length === 0 && product.constructor === Object) {
            return '';
        } else {
            return (
                <div className="row">
		    		<div className="col-md-6">
		    			<img src={`${API}${product.image}`} className="product-image" alt={product.name}/>
		    		</div>
		    		<div className="col-md-6">
		    			<h2>{product.name}</h2>
						<p className="lead">{product.description}</p>
						<p className="black-9"><strong>Price: </strong>${product.price}</p>
						<p className="black-8"><strong>Category: </strong>{product.category_name}</p>
						<p className="black-8"><strong>Available Quantity: </strong><span className="badge badge-primary badge-pill">{product.quantity}</span></p>
						<p className="black-8"><strong>Added On: </strong>{moment(product.created).fromNow()}</p>
		    		</div>
		    	</div>
            )
        }
    };

    const showError = () => {
        if (error) {
            return (
                <div className="alert alert-danger">
    				An error occured
    			</div>
            )
        } else {
            return '';
        }
    };

    const showRelated = () => {
        if (related.length) {
            return (
                <Fragment>
	    			<h2 className="mt-3"> Related Products</h2>
	    			<div className="row">
	    				{related.map((p,i) => {
	    					return <ProductCard key={i} product={p} />
	    				}) }
	    			</div>
	    		</Fragment>
            )
        } else {
            return (
                <h2 className="mt-3">No Related Products Found</h2>
            )
        }
    };

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)}>
        	{showError()}
        	{showProduct()}
        	{showRelated()}
        </Layout>
    )
}

export default Product;