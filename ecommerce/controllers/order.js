const con = require('../db');

exports.create = (req, res) => {
    //console.log(req.body.order.products);
    try {
        var sql = `INSERT INTO
					  orders (products, transaction_id, amount, address, user)
					VALUES
					  ('${Object.assign({}, req.body.order.products)}', '${req.body.order.transaction_id}', '${req.body.order.amount}', '${req.body.order.address}', ${req.profile.id})`;

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