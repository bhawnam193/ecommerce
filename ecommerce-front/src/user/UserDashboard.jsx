import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { fetchOrders } from './apiUser';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import * as moment from "moment/moment.js"

const Dashboard = () => {

    const { user: { id, name, email, role }, token } = isAuthenticated();

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchOrders(id, token)
            .then(data => {
            	if (data.orders) {
            		setOrders(data.orders);
            		setError(false);
            	} else {
            		setError(true);
            	}
            })
            .catch(err => {
            	setError(true);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const userLinks = () => {
        return (
            <div className="card mb-5">
				<h3 className="card-header">User Links</h3>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/cart">My Cart</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to={`/profile/${id}`}>Update Profile</Link>
					</li>
				</ul>
			</div>
        )
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item">{name}</li>
					<li className="list-group-item">{email}</li>
					<li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
				</ul>
			</div>
        )
    };

    const showPurchaseHistory = (orders) => {
        if (orders.length) {
            return (
                <ul className="list-group">
            		{orders.map((order, i) => {
        				return (
        					<li className="list-group-item" key={i}>
					    		<strong>ID:</strong> {order.ID} <br/>
					    		<strong>Address:</strong> {order.address} <br/>
					    		<strong>Ordered:</strong> {moment(order.created).fromNow()} <br/>
					    		<strong>Products:</strong> <ol>{ JSON.parse(order.products).map( (product, index ) => {
					    			return <li key={index}>{product.name}</li>
					    		}) }</ol>
					    		<strong>Transcation ID:</strong> {order.transaction_id} <br/>
					    		<strong>Amount:</strong> {order.amount} <br/>
					    		<strong>Status:</strong> {order.status} <br/>
					    	</li>
        				)
					})}
            	</ul>
            )
        } else {
            return 'You have not made any purchase'
        }
    }

    const showError = () => (
    	'An Error Occurred'
    )

    const purchaseHistory = () => {
        return (
            <div className="card mb-5">
				<h3 className="card-header">Purchase History</h3>
				<ul className="list-group">
					<li className="list-group-item">{ error === true ? showError() : showPurchaseHistory(orders)}</li>
				</ul>
			</div>
        )
    };

    return (
        <Layout title="Dashboard" description={`G'day ${name}!`}>
        	<Helmet>
                <title>Dashboard | E-commerce App</title>
                <meta name="description" content="User Dashboard for the E-commerce App" />
            </Helmet>
			<div className="row">
				<div className="col-3">
					{userLinks()}
				</div>
				<div className="col-9">
					{userInfo()}
					{purchaseHistory()}
				</div>
			</div>
		</Layout>
    )
}

export default Dashboard;