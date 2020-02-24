import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken } from './apiCore';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products }) => {

    const [data, setData] = useState({
        sucees: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user.id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
            .then(res => {
                if (res.error) {
                    setData({ ...data, error: res.error });
                } else {
                    setData({ ...data, clientToken: res.clientToken });
                }
            })
    };

    useEffect(() => {
        getToken(userId, token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0);
    };

    const showDropIn = () => {
        return (
            <div>
                {data.clientToken !==null && products.length > 0 ? (
                        <div>
                        <DropIn options={{ authorization: data.clientToken }} onInstance={instance => (data.instance = instance)} />
                            <button className="btn btn-success">Checkout</button>
                        </div>
                    ) : null }
            </div>
        )
    };

    const showCheckout = () => {
        return (
            isAuthenticated() ? (
                <div>
                    {showDropIn()}
                </div>
            ) : (
                <Link to="signin">
                    <button className="btn btn-primary">
                        Sign in to Checkout
                    </button>
                </Link>
            )
        )
    }

    return (
        <div>
            <h4>Total: ${getTotal()}</h4>
            {showCheckout()}
        </div>
    )
}

export default Checkout;