import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../config';
import { addItem } from './cartHelpers';

const ProductCard = ({ product }) => {

    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    };

    return (
        <div className="col-md-4 mb-3">
        	{shouldRedirect(redirect)}
			<div className="card product-card">
				<img src={`${API}${product.image}`} className="card-img-top" alt={product.name} />
				<div className="card-body">
					<h5 className="card-title">{product.name}</h5>
					<p className="card-text">{product.description.substring(0,100)}</p>
					<p className="card-text"><strong>Price: </strong>${product.price}</p>
					<Link to={`/product/${product.ID}`}>
						<button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
					</Link>
					<button className="btn btn-outline-warning mt-2 mb-2" onClick={addToCart}>Add to Cart</button>
				</div>
			</div>
		</div>
    )
}

export default ProductCard;