import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProduct } from './apiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        image: '',
        loading: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: '',
        error: false
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        createdProduct,
        redirectToProfile,
        formData,
        error
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, []);

    //destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = name => event => {

        const value = name === 'image' ? event.target.files[0] : event.target.value;

        formData.set(name, value);

        setValues({ ...values, [name]: value });
    };

    const formSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: [], loading: true });
        //make api request to backend
        createProduct(user.id, token, formData)
            .then(data => {
                if (data.errors) {
                    setValues({ ...values, error: data.errors[0].msg });
                } else {
                    if (data.created) {
                        setValues({ ...values, name: '', description: '', image: '', price: '',category: '', quantity: '', loading: false });
                    }
                }
            });
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">
                    Go Back to Dashboard
                </Link>
            </div>
        )
    };

    const showError = () => {
        if (error !== '') {
            return (
                <div className="alert alert-danger">
                    <p>{error}</p>
            </div>
            )
        } else {
            return ''
        }
    };

    const showSuccess = () => {
        //if (success !== '') {
        return (
            <div className="alert alert-success">
                    <p>{/*success*/}</p>
            </div>
        )
        // } else {
        //     return ''
        // }
    };

    const newProductForm = () => {
        return (
            <form className="mb-3" onSubmit={formSubmit}>
                <div className="form-group" >
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange('name')} value={name} autoFocus/>
                </div>

                <div className="form-group" >
                    <label className="text-muted">Description</label>
                    <textarea className="form-control" onChange={handleChange('description')} value={description}/>
                </div>

                <div className="form-group" >
                    <label className="text-muted">Price</label>
                    <input type="number" className="form-control" onChange={handleChange('price')} value={price} />
                </div>

                <div className="form-group" >
                    <label className="text-muted">Category</label>
                    <select onChange={handleChange('category')}>
                        <option value="11">new test</option>
                        <option value="10">test</option>
                        <option value="9">dfcsdcsd</option>
                    </select>
                </div>

                <div className="form-group" >
                    <label className="text-muted">Quantity</label>
                    <input type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} />
                </div>

                <div className="form-group" >
                    <label className="text-muted">Shipping</label>
                    <select onChange={handleChange('shipping')}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input type="file" name="image" accept="image/*" onChange={handleChange('image')}/>
                    </label>
                </div>
                
                <input className="btn btn-outline-primary" type="submit" value="Create Product"/>
            </form>
        )
    }

    return (
        <Layout title="Add a new Product" description={`G'day ${user.name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newProductForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct;