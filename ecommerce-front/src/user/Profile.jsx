import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { readUser } from './apiUser';

const Profile = (props) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { name, email, password, error, success } = values;

    const { token } = isAuthenticated();

    const init = (userId) => {
        console.log(userId);
        readUser(userId, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: true })
                } else {
                	setValues({...values, name: data.name, email: data.email})
                }
            })
    };

    useEffect(() => {
        init(props.match.params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout title="Profile" description={`Update your profile`}>
			<h2>Profile Update</h2>
		</Layout>
    )
}

export default Profile;