import React from 'react'
import { Link } from 'react-router-dom';
import { API } from '../config';

const ProductCard = ({ product }) => {
    return (
        <div className="col-md-4 mb-3">
			<div className="card product-card">
				<img src={`${API}${product.image}`} className="card-img-top" alt={product.name}/>
				<div className="card-body">
					<h5 className="card-title">{product.name}</h5>
					<p className="card-text">{product.description}</p>
					<p className="card-text"><strong>Price: </strong>${product.price}</p>
					<Link to="/">
						<button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
					</Link>
					<button className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
				</div>
			</div>
		</div>
    )
}

export default ProductCard;