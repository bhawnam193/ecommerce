const con = require('../db');

exports.userByID = (req, res, next, id) => {
    try {
        var sql = `SELECT
                      *
                    FROM
                      users
                    WHERE
                      id = ${id}`;
        con.query(sql, function(err, result) {
            if (err) throw err;

            if (result.length) {
                result[0].salt = undefined;
                result[0].password = undefined;
                req.profile = result[0];
                next();
            } else {
                return res.status(400).json({
                    error: 'User not found'
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};

exports.read = (req, res) => {
    req.profile.salt = undefined;
    req.profile.password = undefined;
    return res.json(req.profile);
};
