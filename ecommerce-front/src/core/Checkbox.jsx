import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        //return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        //if currently checked was not aready in checked state> push
        //else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId)
    }



    return categories.map((c, i) => {
        return (
            <li className="list-unstyled" key={i}>
				<label className="form-check-label"><input onChange={handleToggle(c.ID)} type="checkbox" className="form-check-input" value={checked.indexOf(c.ID === -1)}/>{c.name}</label>
			</li>
        )
    })
}

export default Checkbox;