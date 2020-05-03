import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getSingleProduct, updateProduct, getCategories } from './apiAdmin';

const UpdateProducts = (props) => {

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
        formData: '',
        error: false,
        success: false
    });

    //this is used to empty the input field file
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        formData,
        error,
        success
    } = values;

    const { user, token } = isAuthenticated();

    const loadProduct = (productId) => {
        getSingleProduct(productId)
            .then(data => {
                if (data.errors) {
                    console.log(data.errors);
                } else {
                    setValues({
                        name: data.product.name,
                        description: data.product.description,
                        price: data.product.price,
                        quantity: data.product.quantity,
                        category: data.product.category,
                        image: data.product.image,
                        shipping: data.product.shipping,
                        formData: new FormData()
                    });
                }
            });
    }

    useEffect(() => {
        //get the categories for the select dropdown
        getCategories()
            .then(data => {
                console.log(data);
                if (data.errors) {
                    setValues({ ...values, error: data.errors });
                } else {
                    setValues({
                        categories: data.categories
                    });

                    loadProduct(props.match.params.productId);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = name => event => {

        const value = name === 'image' ? event.target.files[0] : event.target.value;

        formData.set(name, value);

        setValues({ ...values, [name]: value });
    };

    const formSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: [], loading: true });
        //make api request to backend
        updateProduct(props.match.params.productId, user.id, token, formData)
            .then(data => {
                if (data.errors) {
                    setValues({ ...values, error: data.errors[0].msg, loading: false, });
                } else {
                    if (data.updated) {

                        setValues({ ...values, name: '', description: '', price: '', category: '', quantity: '', shipping: '', image: '', loading: false, success: 'Product Updated Successfuly', formData: new FormData(), error: false });
                        //to empty the input fields
                        setInputKey(Math.random().toString(36));
                    }
                }
            });
    }

    const showError = () => {
        if (error) {
            return (
                <div className="alert alert-danger">
                    {error}
                </div>
            )
        } else {
            return ''
        }
    };

    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert alert-success">
                    {success}
                </div>
            )
        } else {
            return ''
        }
    };


    const updateProductForm = () => {
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
                    <select className="form-control" onChange={handleChange('category')} value={category}>
                        <option value="">Select</option>
                        {categories && categories.map((val, i) => {
                            return <option key={i} value={val.ID}>{val.name}</option>
                        })}
                    </select>
                </div>

                <div className="form-group" >
                    <label className="text-muted">Quantity</label>
                    <input type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} />
                </div>

                <div className="form-group" >
                    <label className="text-muted">Shipping</label>
                    <select className="form-control" onChange={handleChange('shipping')} value={shipping}>
                        <option value="">Select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-muted">Product Image</label><br/>
                    <label className="btn btn-secondary">
                        <input type="file" name="image" accept="image/*" onChange={handleChange('image')} key={inputKey}/>
                    </label>
                </div>
                
                <input className="btn btn-outline-primary" type="submit" value="Update Product"/>
            </form>
        )
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

    const showLoading = () => {
        if (loading) {
            return <h2>Loading...</h2>
        }
    };

    return (
        <Layout title="Manage Products" description={`G'day ${user.name}, ready to manage your products?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {updateProductForm()}
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProducts;