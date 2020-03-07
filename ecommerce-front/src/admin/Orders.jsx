import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders } from './apiAdmin';
import moment from 'moment';

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user.id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setOrders(data);
                }
            });
    }

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goBack = () => {
        return (
            <div className="mt-5 mb-5">
                <Link to="/admin/dashboard" className="text-warning">
                    Go Back to Dashboard
                </Link>
            </div>
        )
    };

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">Total Orders: {orders.length} </h1>
            )
        } else {
            return (
                <h1 className="text-danger display-2">No Orders</h1>
            )
        }
    }
    return (
        <Layout title="Orders" description={`G'day ${user.name}, you can manage all the orders here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.length && orders.map((order, oIndex) => {
                        return (
                            <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                                <h2 className="mb-5">
                                    <span className="bg-primary">Order ID: {order.ID}</span> 
                                </h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        <strong>Status:</strong> {order.status}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Transaction ID:</strong> {order.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Amount:</strong> ${order.amount}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Ordered By:</strong> {order.name}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Ordered On:</strong> {moment(order.created).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Delivery Address:</strong> {order.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic"> Total Products: {JSON.parse(order.products).length}</h3>
                                {console.log(JSON.parse(order.products))}
                            </div>
                        )
                    })}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default Orders;