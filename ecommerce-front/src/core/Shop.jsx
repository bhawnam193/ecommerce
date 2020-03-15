import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getFilteredProducts } from './apiCore';
import ProductCard from './ProductCard';
import { getCategories } from '../admin/apiAdmin';

import Checkbox from './Checkbox';
import prices from './fixedPrices';
import RadioBox from './RadioBox';
import {Helmet} from "react-helmet";

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit] = useState(3);
    const [offset, setOffset] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const [size, setSize] = useState(0);

    useEffect(() => {
        //fetch categories
        getCategories()
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0].msg);
                } else {
                    setCategories(data.categories);
                }
            });
        //fetch default results
        loadFilteredResult(myFilters.filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilters = (filters, filterBy) => {
        const localFilter = { ...myFilters };
        localFilter.filters[filterBy] = filters;

        if (filterBy === 'price') {
            let priceValues = handlePrice(filters);
            localFilter.filters[filterBy] = priceValues;
        }

        loadFilteredResult(myFilters.filters);
        setMyFilters(localFilter);
    }

    const showProducts = () => {
        if (filteredResults) {
            return (
                filteredResults.map((p, i) => {
                    return (<ProductCard product={p} key={i} />)
                })
            )
        } else {
            return (
                <h4 className="col-md-12">No Product Found</h4>
            )
        }
    };

    const loadFilteredResult = (newFilters) => {

        getFilteredProducts(offset, limit, newFilters, '', '')
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0].msg)
                } else {
                    setFilteredResults(data.result);
                    setSize(data.result.length);
                    setOffset(0);
                }
            });
    };

    const loadMore = () => {
        let localOffset = offset + limit;

        getFilteredProducts(localOffset, limit, myFilters.filters, '', '')
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0].msg)
                } else {
                    setFilteredResults([...filteredResults, ...data.result]);
                    setSize(data.result.length);
                    setOffset(localOffset);
                }
            });
    }

    const loadMoreButton = () => {

        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

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

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key].id === parseInt(value)) {
                array = data[key].array;
            }
        }

        return array;
    }

    return (
        <Layout title="Shop Page" description="Search and find books of your choice">
            <Helmet>
                <title>Shop | E-commerce App</title>
                <meta name="description" content="This is the shop page of the E-commerce App" />
            </Helmet>
            <div className="row">
                <div className="col-md-3 filter-sidebar">
                    <h4>Filter by categories</h4>
                    <Checkbox categories={categories}  handleFilters={ filters => handleFilters(filters, 'category')}/>

                    <h4 className="mt-2">Filter by price range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={ filters => handleFilters(filters, 'price')}/>
                    </div>
                </div>
                <div className="col-md-9">
                    {showError()}
                    <div className="row">
                        {showProducts()}

                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
};

export default Shop;