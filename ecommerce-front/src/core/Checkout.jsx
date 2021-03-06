import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelpers';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
        loading: false,
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
            });
    };

    useEffect(() => {
        if (userId && token) {
            getToken(userId, token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    let deliveryAddress = data.address;
    
    const buy = () => {
        setData({ loading: true });
        //send the nonce to the server
        //nonce = data.instance.requestPaymentMethod()
        let nonce;
        // eslint-disable-next-line no-unused-vars
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;
                //once you have nonce (card type, card number) send nocne as 'paymentMethodNonce'
                //and also total to be charged
                //console.log('send nocne and total to process: ', nonce, getTotal(products));
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)
                    .then(res => {
                        setData({ ...data, success: res.success });
                        //create order
                        const createOrderData = {
                            products: products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: deliveryAddress
                        }
                        createOrder(userId, token, createOrderData)
                            .then(resp => {
                                //empty cart
                                emptyCart(() => {
                                    console.log('payment success cart empty');
                                });
                                setRun(!run); // run useEffect in parent Cart
                                setData({ ...data, loading: false, success: true });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                console.log('dropin error:', error)
                setData({ ...data, error: error.message });
            });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0);
    };

    const showLoading = loading => {
        return loading && <h2>Loading...</h2>
    }

    const showDropIn = () => {
        return (
            <div onBlur={() => { setData({...data, error: false}) }}>
                {data.clientToken !==null && products.length > 0 ? (
                        <div>
                            <div className="form-group mb-3">
                                <label className="text-muted">Delivery Address:</label>
                                <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Type your delivery address here..."/>
                            </div>
                            <DropIn options={{ authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            } }} onInstance={instance => (data.instance = instance)} />
                            <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                        </div>
                    ) : null }
            </div>
        )
    };

    const showError = error => {
        if (error) {
            return (
                <div className="alert alert-danger"> {error} </div>
            )
        } else {
            return '';
        }
    };

    const showSuccess = success => {
        if (success) {
            return (
                <div className="alert alert-info">  Thanks you for purchasing</div>
            )
        } else {
            return '';
        }
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
            {showLoading(data.loading)}
            {showError(data.error)}
            {showSuccess(data.success)}
            {showCheckout()}
        </div>
    )
}

export default Checkout;