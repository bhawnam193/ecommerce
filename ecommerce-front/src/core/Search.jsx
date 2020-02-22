import React, { useState, useEffect } from 'react';
import { getCategories } from '../admin/apiAdmin';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: 'All',
        search: '',
        results: [],
        searched: false,
    });

    const { categories, category, search, results, searched } = data;

    useEffect(() => {
        //fetch categories
        getCategories()
            .then(data => {
                if (data.errors) {
                    console.log(data.errors[0].msg);
                } else {
                    setData({ ...data, categories: data.categories });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchData = () => {
    	console.log(search, category);
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
            					<option value="All">Pick Category</option>
            					{categories.map( (c,i) => {
            						return <option key={i} value={c.ID}>{c.name}</option>
            					})}
            				</select>
            			</div>
            			<input type="text" className="form-control" onChange={handleChange('search')} placeholder="Search Products"/>
            		</div>
            		<div className="btn input-group-append" style={{border: 'none'}}>
            			<input type="submit" className="input-group-text"/>
            		</div>
            	</span>
	    	</form>
        )
    };

    return (
        <div className="search-container mb-3">
			{searcForm()}
		</div>
    )
};


export default Search