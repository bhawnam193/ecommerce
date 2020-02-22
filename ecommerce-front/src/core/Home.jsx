import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import Search from './Search';

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);

    const [productsByArrival, setProductsByArrival] = useState([]);

    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold')
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0].msg)
                } else {
                    setProductsBySell(data.result)
                }
            })
    };

    const loadProductsByArrival = () => {
        getProducts('created')
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0].msg);
                } else {
                    setProductsByArrival(data.result);
                }
            })
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    const showError = () => {
        if (error) {
            return (
                <div className="alert alert-danger">
                    An error Occured
                </div>
            )
        } else {
            return '';
        }
    };

    return (
        <Layout title="Home Page" description="node ecommerce app">
            <Search />
            {showError()}
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map( (product, i) => {
                    return <ProductCard product={product} key={i}/>
                })}
            </div>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map( (product, i) => {
                    return <ProductCard product={product} key={i}/>
                })}
            </div>
        </Layout>
    )
}

export default Home;