import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getAllProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
    
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();
    
    const destroy = productId => {
        deleteProduct(productId, user.id, token)
            .then( data => {
                if (data.errors) {
                    console.log(data.errors);
                } else {
                    loadProducts();
                }
            })
    };

    const loadProducts = () => {
        getAllProducts()
            .then( data => {
                if (data.errors) {
                    console.log(data.errors);
                } else {
                    setProducts(data.result);
                }
            });
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const goBack = () => {
        return (
            <div className="mt-5">
    			<Link to="/admin/dashboard" className="text-warning">
    				Go Back to Dashboard
    			</Link>
    		</div>
        )
    };


    return (
        <Layout title="Manage Products" description={`G'day ${user.name}, ready to manage your products?`}>
    		<div className="row">
    			<div className="col-md-8 offset-md-2">
                    <ul className="list-group">
                        {products.length && products.map((p,i) => {
                            return(
                                <li key={i} className="list-group-item d-flex. justify-content-between align-items-center">
                                    <strong>{p.name}</strong>
                                    <Link to={`/admin/products/update/${p.ID}`}>
                                        <span className="badge badge-warning badge-pill">
                                            Update
                                        </span>
                                    </Link>
                                    <span onClick={ () => destroy(p.ID)} className="badge badge-danger badge-pill">
                                            Delete
                                        </span>
                                </li>
                            )
                        })}
                    </ul>
    				{goBack()}
    			</div>
    		</div>
    	</Layout>
    )
}

export default ManageProducts;