import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card mb-5">
				<h3 className="card-header">Admin Links</h3>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/orders">View Orders</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/create/category">Create Category</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/create/product">Add Product</Link>	
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/products">Manage Products</Link>
						
					</li>
				</ul>
			</div>
        )
    };

    const adminInfo = () => {
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

    return (
        <Layout title="Dashboard" description={`G'day ${name}!`}>
        	<Helmet>
                <title>Admin Dashboard | E-commerce App</title>
                <meta name="description" content="Admin Dashboard for the E-commerce App" />
            </Helmet>
			<div className="row">
				<div className="col-md-3">
					{adminLinks()}
				</div>
				<div className="col-md-9">
					{adminInfo()}
				</div>
			</div>
		</Layout>
    )
}

export default AdminDashboard;