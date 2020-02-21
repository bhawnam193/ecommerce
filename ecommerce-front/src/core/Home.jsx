import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';

const Home = () => {
    
    const [productsBySell, setProductsBySell] = useState([]);

    const [productsByArrival, setProductsByArrival] = useState([]);

    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
    	getProducts('sold')
    	.then( data => {
    		if(data.errors) {
    			setError(data.errors[0].msg)
    		} else {
    			setProductsBySell(data.result)
    		}
    	})
    };

    const loadProductsByArrival = () => {
    	getProducts('created')
    	.then( data => {
    		if(data.errors) {
    			setError(data.errors[0].msg);
    		} else {
    			setProductsByArrival(data.result);
    		}
    	})
    };

    useEffect( () => {
    	loadProductsByArrival();
    	loadProductsBySell();
    }, []);

    return (
	    <Layout title="Home Page" description="node ecommerce app">
			{JSON.stringify(productsByArrival)}
			{JSON.stringify(productsBySell)}
		</Layout>
	)
}

export default Home;