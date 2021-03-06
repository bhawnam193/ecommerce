import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import * as moment from "moment/moment.js"

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([]);

    const { user, token } = isAuthenticated();

    const showStatus = o => {
        return (
            <div className="form-group">
                <h3 className="mark mb-4"> Status: {o.status}</h3>
                <select className="form-control" onChange={e => handelStatusChange(e, o.ID)}>
                    <option>Update Satus</option>
                    {status.length && status.map((s, i) => {
                        return (<option key={i} value={s}>{s}</option>)
                    })}
                </select>
            </div>
        )
    }

    const handelStatusChange = (event, orderID) => {
        if (event.target.value) {
            updateOrderStatus(orderID, event.target.value, user.id, token)
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    if (res.updated) {
                        loadOrders();
                    }
                }
            });
        }
    };

    const loadStatusValues = () => {
        getStatusValues(user.id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setStatus(data[0].Type.replace("enum(", "").replace(")", "").replace(/'/g, "").split(','));
                }
            });
    }

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
        loadStatusValues();
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

    const showInput = (key, value) => {
        return (
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text"><strong>{key}</strong></div>
                </div>
                <input type="text" value={value} className="form-control" readOnly />
            </div>
        )
    };

    return (
        <Layout title="Orders" description={`G'day ${user.name}, you can manage all the orders here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.length && orders.map((order, oIndex) => {

                        const products = JSON.parse(order.products);
                        return (
                            <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                                <h2 className="mb-5">
                                    <span className="bg-primary">Order ID: {order.ID}</span> 
                                </h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(order)}
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

                                <h3 className="mt-4 mb-4 font-italic"> Total Products: {products.length}</h3>
                                {products.map((p, i) => {
                                    return <div className="mb-4" key={i} style={{padding: '20px', border: '1px solid indigo'}}>
                                        {showInput('Product Name', p.name)}
                                        {showInput('Product Price', p.price)}
                                        {showInput('Product Count', p.count)}
                                        {showInput('Product ID', p.ID)}
                                    </div>
                                })}
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