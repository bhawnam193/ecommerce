import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = ({ prices, handleFilters }) => {

    // const [value, setValue] = useState([]);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        // //return the first index or -1
        // const currentCategoryId = checked.indexOf(c);
        // const newCheckedCategoryId = [...checked];

        // //if currently checked was not aready in checked state> push
        // //else pull/take off
        // if (currentCategoryId === -1) {
        //     newCheckedCategoryId.push(c);
        // } else {
        //     newCheckedCategoryId.splice(currentCategoryId, 1);
        // }

        // setChecked(newCheckedCategoryId);
        // handleFilters(newCheckedCategoryId)
    }




    return prices.map((p, i) => {
        return (
            <div key={i}>
                <label className="form-check-label"><input onChange={handleChange} type="radio" className="form-check-input" name="price" value={`${p.id}`} className="mr-2 ml-4"/>{p.name}</label>
            </div>
        )
    })

}

export default RadioBox;