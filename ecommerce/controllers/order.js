const con = require('../db');

exports.create = (req, res) => {
	const prod = JSON.stringify(Object.assign({}, req.body.order.products));

    try {
        var sql = `INSERT INTO
					  orders (products, transaction_id, amount, address, user)
					VALUES ('${prod}', '${req.body.order.transaction_id}', '${req.body.order.amount}', '${req.body.order.address}', ${req.profile.id})`;

        con.query(sql, function(err, result) {

            if (err) throw err;

            if (result.length) {
                return res.status(200).json({ order_create: true });
            } else {
                return res.status(400).json({
                    errors: [{ msg: 'An error occured while creating order' }]
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
}

exports.decreaseQuantity = (req, res, next) => {
	
	let products = req.body.order.products;

	for(i = 0; i<products.length; i++) {
		try {
	        var sql = `UPDATE products
						  SET quantity = quantity - ${products[i].count}, sold = sold + ${products[i].count}`;

	        con.query(sql, function(err, result) {

	            if (err) throw err;

	            if (result.affectedRows) {
	                //do nothing
	            } else {
	                return res.status(400).json({
	                    errors: [{ msg: 'An error occured while updating product' }]
	                });
	            }
	        });
	    } catch (err) {
	        return res.status(422).json({
	            errors: err.array()
	        });
	    }
	}

	next();
};

exports.listOrders = (req, res) => {
	
	try {
        var sql = `SELECT
					  o.*,
					  u.name,
					  u.email
					FROM
					  orders o
					  JOIN users u
					WHERE
					  o.user = u.id`;

        con.query(sql, function(err, result) {

            if (err) throw err;

            if (result.length) {
                return res.json(result);
            } else {
                return res.status(400).json({
                    errors: [{ msg: 'An error occured while updating product' }]
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};