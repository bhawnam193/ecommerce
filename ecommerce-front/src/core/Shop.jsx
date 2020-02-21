import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import { getCategories } from '../admin/apiAdmin';

const Shop = () => {

	useEffect( () => {
		getCategories()
		.then( data => {
			if (data.errors) {

			}
		})
	});
	
    return (
        <Layout title="Shop Page" description="Search and find books of your choice">
	    	<div className="row">
	    		<div className="col-md-3 filter-sidebar">

	    		</div>
	    		<div className="col-md-9">

	    		</div>
			</div>
		</Layout>
    )
};

export default Shop;