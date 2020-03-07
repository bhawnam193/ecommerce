import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders } from './apiAdmin';

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

    const noOrders = orders => {
        return orders.length < 1 ? <h4>No Orders</h4> : '';
    }

    const goBack = () => {
        return (
            <div className="mt-5 mb-5">
                <Link to="/admin/dashboard" className="text-warning">
                    Go Back to Dashboard
                </Link>
            </div>
        )
    };
    return (
        <Layout title="Orders" description={`G'day ${user.name}, you can manage all the orders here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {noOrders(orders)}
                    {JSON.stringify(orders)}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default Orders;