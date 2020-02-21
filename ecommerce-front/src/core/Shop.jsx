import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import { getCategories } from '../admin/apiAdmin';
import Checkbox from './Checkbox';
import prices from './fixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {

	const [myFilters, setMyFilters] = useState({
		filters: {
			category: [],
			price: []
		}
	});
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        //fetch categories
        getCategories()
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0].msg);
                } else {
                    setCategories(data.categories);
                }
            })
    }, []);

    const handleFilters = (filters, filterBy) => {
    	const localFilter = {...myFilters};
    	localFilter.filters[filterBy] = filters;
    	setMyFilters(localFilter);
    }

    return (
        <Layout title="Shop Page" description="Search and find books of your choice">
	    	<div className="row">
	    		<div className="col-md-3 filter-sidebar">
		    		<h4>Filter by categories</h4>
		    		<ul>
		    			<Checkbox categories={categories}  handleFilters={ filters => handleFilters(filters, 'category')}/>
		    		</ul>

		    		<h4>Filter by price range</h4>
		    		<div>
		    			<RadioBox prices={prices} handleFilters={ filters => handleFilters(filters, 'price')}/>
	    			</div>
	    		</div>
	    		<div className="col-md-9">
	    			{JSON.stringify(myFilters)}
	    		</div>
			</div>
		</Layout>
    )
};

export default Shop;