import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { readUser, updateUser, updateUserLocal } from './apiUser';

const Profile = (props) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: [],
        success: false
    });

    const { name, email, password, error, success } = values;

    const { token } = isAuthenticated();

    const init = (userId) => {

        readUser(userId, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: ['Cannot get user to update'] })
                } else {
                    setValues({ ...values, name: data.name, email: data.email, error: [] })
                }
            })
    };

    useEffect(() => {
        init(props.match.params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = nameinput => event => {
        setValues({ ...values, error: [], [nameinput]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault();
        updateUser(props.match.params.userId, token, { name, email, password })
            .then(data => {
                if (data.errors) {
                    setValues({ ...values, error: data.errors });
                } else {
                    updateUserLocal(data, () => {
                        setValues({ ...values, name: data.name, email: data.email, success: true });
                    });
                }
            })
    }

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to="/user/dashboard" />
        }
    };

    const goBack = () => {
        return (
            <div className="mt-5 mb-5">
                <Link to="/user/dashboard" className="text-warning">
                    Go Back to Dashboard
                </Link>
            </div>
        )
    };

    const showError = (error) => {
        if (error.length) {
            return (
                <div className="alert alert-danger">
                {error.map((e,i) => {
                    return <p key={i}>{e.msg}</p>
                })}
                </div>
            )
        } else {
            return ''
        }
    };

    const profileUpdate = (name, email, password) => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
                </div>

                <input type="submit" className="btn btn-primary" onClick={handleSubmit}/>
            </form>
        )
    }
    return (
        <Layout title="Profile" description="Update your profile">
            <h2>Profile Update</h2>
            {showError(error)}
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
            {goBack()}
        </Layout>
    )
}

export default Profile;