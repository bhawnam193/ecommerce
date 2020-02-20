import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError('');
        setSuccess('');
        setName(event.target.value);
    };

    const formSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        //make api request to backend
        createCategory(user.id, token, { name })
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0].msg);
                } else {
                    if (data.created) {
                        setSuccess('Category Created');
                        setName('');
                    }
                }
            })
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
        if (success !== '') {
            return (
                <div className="alert alert-success">
                	<p>{success}</p>
            </div>
            )
        } else {
            return ''
        }
    };

    const newCategotyForm = () => {
        return (
            <form onSubmit={formSubmit}>
    			<div className="form-group" >
	    			<label className="text-muted">Name</label>
	    			<input type="text" className="form-control" onChange={handleChange} value={name} autoFocus/>
	    		</div>
    			<input className="btn btn-outline-primary" type="submit" value="Create Category"/>
    		</form>
        )
    }

    return (
        <Layout title="Add a new Category" description={`G'day ${user.name}, ready to add a new category?`}>
    		<div className="row">
    			<div className="col-md-8 offset-md-2">
    				{showError()}
    				{showSuccess()}
    				{newCategotyForm()}
    				{goBack()}
    			</div>
    		</div>
    	</Layout>
    )
}

export default AddCategory;