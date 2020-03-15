import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import CartRow from './CartRow';
import Checkout from './Checkout';
import { Helmet } from "react-helmet";

const Cart = () => {

    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                <table className="table cart-table">
                    <thead>
                        <tr> 
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((p,i) => {
                            return <CartRow key={i} p={p} setRun={setRun} run={run}/>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    const noItemMessage = () => {
        return (
            <h2>Your cart is empty.<br/> 
                <Link to="/shop">Continue Shopping</Link>
            </h2>
        )
    }

    return (
        <Layout title="Shopping Cart" description="Manage your cart items. Add, remove, checkout or continue shopping.">
            <Helmet>
                <title>Cart | E-commerce App</title>
                <meta name="description" content="Manage your cart items. Add, remove, checkout or continue shopping." />
            </Helmet>
            <div className="row">
                <div className="col-md-9">
                    {items.length ? showItems(items) : noItemMessage()}
                </div>
                <div className="col-md-3">
                    <h3 className="mb-4">Your cart summary</h3>
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
           </div>
        </Layout>
    )
}

export default Cart;