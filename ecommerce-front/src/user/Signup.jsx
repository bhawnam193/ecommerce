import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: [],
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: [], [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: [] });
        signup({ name, email, password })
            .then(data => {
                if (data) {
                    if (data.errors) {
                        setValues({ ...values, error: data.errors, success: false });
                    } else {
                        setValues({
                            ...values,
                            name: '',
                            email: '',
                            password: '',
                            error: [],
                            success: true
                        });
                    }
                }
            });
    }

    const showError = () => {
        if (error != null && error.length) {
            return (
                <div className="alert alert-danger">
                    { 
                        error.map((e, i) => {
                            return <p key={i}>{ (e.msg ) ? e.msg : ''}</p>
                        })
                    }
                </div>
            )
        } else {
            return ''
        }
    };

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            New account is created. Please <Link to="/signin">Sign In</Link>.
        </div>
    )

    const signUpForm = () => {
        return (
            <form className="col-md-8 offset-md-2">
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" onChange={handleChange('password')} className="form-control" value={password}/>
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    };

    return (
        <Layout title="Sign Up" description="Sign up for node-react E-commerce app">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
};


export default Signup;