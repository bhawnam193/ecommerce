import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import CartRow from './CartRow';

const Cart = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, []);

    const showItems = items => {
        return (
            <div>
    			<h2>Your cart has {`${items.length}`} items</h2>
    			<hr />
    			<table className="table">
    				<thead>
	    				<tr> 
	    					<th scope="col">Name</th>
	    					<th scope="col">Image</th>
	    					<th scope="col">Quantity</th>
		    			</tr>
		    		</thead>
		    		<tbody>
	    				{items.map((p,i) => {
	    					return <CartRow key={i} p={p}/>
	    				})}
    				</tbody>
    			</table>
    		</div>
        )
    }

    const noItemMessage = () => {
        return (
            <h2>
    			Your cart is empty.<br/> 
    			<Link to="/shop">Continue Shopping</Link>
    		</h2>
        )
    }

    return (
        <Layout title="Shopping Cart" description="Manage your cart items. Add, remove,  checkout or continue shopping.">
           <div className="row">
           		<div className="col-md-6">
           			{items.length ? showItems(items) : noItemMessage()}
           		</div>
           		<div className="col-md-6">
           			<p>show shipping</p>
           		</div>
           </div>
        </Layout>
    )
}

export default Cart;