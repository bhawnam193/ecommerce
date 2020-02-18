import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

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
        console.log('in funct')
        setSuccess(false);

        //make api request to backend
        createCategory(user.id, token, {name})
            .then(data => console.log(data))
    }

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
    				{newCategotyForm()}
    			</div>
    		</div>
    	</Layout>
    )
}

export default AddCategory;