import { API } from '../config';
import queryString from 'query-string';

// fetch products based on arrival or most sell for homepage
export const getProducts = (sortBy) => {
    return fetch(`${API}/products/?sortBy=${sortBy}&order=desc&limit=6`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};


//get filtered products for shop page
export const getFilteredProducts = (offset, limit, filters = {}, sortBy, order) => {

    return fetch(`${API}/products/by/search?limit=${limit}&sortBy=${sortBy}&offset=${offset}&order=${order}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ filters: filters })
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};


// fetch products for homesearch
export const list = params => {
    const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};


// fetch product for product page 
export const read = (id) => {
    return fetch(`${API}/product/${id}`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};


export const relatedProducts = (id) => {
    return fetch(`${API}/products/related/${id}?limit=3`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));  
}