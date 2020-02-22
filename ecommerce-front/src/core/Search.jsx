import React, { useState, useEffect, Fragment } from 'react';
import ProductCard from './ProductCard';
import { getCategories } from '../admin/apiAdmin';
import { list } from './apiCore';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: 'All',
        search: '',
        results: [],
        searched: false,
        not_found: false,
    });

    const { categories, category, search, results, searched } = data;

    useEffect(() => {
        //fetch categories
        getCategories()
            .then(res => {
                if (res.errors) {
                    console.log(res.errors[0].msg);
                } else {
                    setData({ ...data, categories: res.categories });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchData = () => {
        setData({ ...data, searched: false });
        if (search) {
            list({ search: search || undefined, category: category })
                .then(res => {
                    if (res.errors) {
                        console.log(res.errors);
                    } else {
                        setData({ ...data, results: res.result, searched: true });
                    }
                });
        }
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {

        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searcForm = () => {
        return (
            <form onSubmit={searchSubmit} style={{width: '100%'}}>
            	<span className="input-group-text">
            		<div className="input-group input-group-lg">
            			<div className="input-group-prepend">
            				<select className="btn mr-2" onChange={handleChange('category')}>
            					<option value="All">All Categories</option>
            					{categories.map( (c,i) => {
            						return <option key={i} value={c.ID}>{c.name}</option>
            					})}
            				</select>
            			</div>
            			<input type="text" className="form-control" onChange={handleChange('search')} placeholder="Search Products"/>
            		</div>
            		<div className="btn input-group-append" style={{border: 'none'}}>
            			<input type="submit" className="btn btn-outline-primary bg-white"/>
            		</div>
            	</span>
	    	</form>
        )
    };

    const searchedProducts = (results = []) => {
        if (results.length) {
            return (
                <Fragment>
	            	<h2 className="mt-4 mb-4 col-md-12">
	            		Found {results.length} Books
	            	</h2> 
	                {results.map((p, i) => {
	                    return <ProductCard product={p} key={i}/>
	                })}
	            </Fragment>
            )
        }
    }

    const showNotFound = (searched = false, results = []) => {
        if (searched && results.length < 1) {
            return (
                <div className="alert alert-danger">
        			No Results Found. Please try again with some different keyword.
        		</div>
            )
        }
    };

    return (
        <Fragment>
	        <div className="search-container mb-3">
				{searcForm()}
			</div>
			<div className="search-container mb-3">
				<div className="row">
					{searchedProducts(results)}
					{showNotFound(searched, results)}
				</div>
			</div>
		</Fragment>
    )
};


export default Search