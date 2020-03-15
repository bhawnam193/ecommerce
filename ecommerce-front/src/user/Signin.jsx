import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: [],
        loading: false,
        redirectToReferrer: false,
    });

    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: [], [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: [], loading: true });
        signin({ email, password })
            .then(data => {
                if (data) {
                    if (data.errors) {
                        setValues({ ...values, error: data.errors, success: false, loading: false });
                    } else {
                        authenticate(data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            });
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

    const showLoading = () =>
        loading && (
            <div className="alert alert-info" >
                <h2>Loading...</h2>
            </div>
        )


    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }

        if (user) {
            return <Redirect to="/" />
        }
    }

    const signInForm = () => {
        return (
            <form className="col-md-8 col-md-offset-2">
                
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
        <Layout title="Sign In" description="Sign In for node-react E-commerce app">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
};

export default Signin;