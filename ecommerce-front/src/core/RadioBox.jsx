import React from 'react';

const RadioBox = ({ prices, handleFilters }) => {

    const handleChange = (event) => {
        handleFilters(event.target.value);
    }

    return prices.map((p, i) => {
        return (
            <div key={i} className="form-check">
                <label className="form-check-label"><input onChange={handleChange} type="radio" className="form-check-input" name="price" value={`${p.id}`}/>{p.name}</label>
            </div>
        )
    })
}

export default RadioBox;