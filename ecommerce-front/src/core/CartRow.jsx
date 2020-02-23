import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config';
import { updateItem, removeItem } from './cartHelpers';

const CartRow = ({ p, setRun = f => f, run = undefined }) => {

    const [count, setCount] = useState(p.count);

    const handleChange = pID => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);

        if (event.target.value >= 1) {
            updateItem(pID, event.target.value);
        }
    }

    return (
        <tr>
			<td>	
				<Link to={`/product/${p.ID}`} >
					{p.name}
				</Link>
			</td>
			<td>
				<img src={`${API}${p.image}`} className="cart-img" alt={p.name} />
			</td>
			<td>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text">Adjust Quantity
						</span>
					</div>
					<input type="number" className="form-control" value={count} onChange={handleChange(p.ID)}/>
				</div>
			</td>
			<td>
				<button className="btn btn-outline-danger" onClick={() => {
					removeItem(p.ID); 
					setRun(!run); // run useEffect in parent Cart 
				}}>Remove Product</button>
			</td>
		</tr>
    )
}
export default CartRow;