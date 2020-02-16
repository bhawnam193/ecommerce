const con = require('../db');

exports.categoryByID = (req, res, next, id) => {

    try {
        var sql = `SELECT
                      *
                    FROM
                      category
                    WHERE
                      ID = ${id}`;
        con.query(sql, function(err, result) {
            if (err) throw err;

            if (result.length) {
                req.category = result[0];
                next();
            } else {
                return res.status(400).json({
                    error: 'Category not found'
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};

exports.create = (req, res) => {

    if (req.body.name) {
        try {
            var sql = `INSERT INTO
                          category (name)
                        VALUES
                          ('${req.body.name}')`;
            con.query(sql, function(err, result) {
                if (err) throw err;
                return res.status(200).json({
                    created: true
                });
            });
        } catch (err) {
            return res.status(422).json({
                errors: err.array()
            });
        }
    } else {
        return res.status(400).json({
            errors: ['name is missing']
        });
    }
};


exports.read = (req, res) => {
    return res.status(200).json({
        category: req.category
    });
};

exports.update = (req, res) => {
    try {
        var sql = `UPDATE
                      category
                    SET
                      name = '${req.body.name}'
                    WHERE
                      ID = ${req.category.ID}`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            if (result.affectedRows) {
                return res.status(200).json({
                    updated: true
                });
            } else {
                return res.status(400).json({
                    error: 'An error occured'
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};

exports.remove = (req, res) => {
    try {
        var sql = `DELETE FROM
                      category
                    WHERE
                      ID = ${req.category.ID}`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            if (result.affectedRows) {
                return res.status(200).json({
                    deleted: true
                });
            } else {
                return res.status(400).json({
                    error: 'An error occured'
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};

exports.list = (req, res) => {
    try {
        var sql = `SELECT
                      *
                    FROM
                      category`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            if (result.length) {
                return res.status(200).json({
                    categories: result
                });
            } else {
                return res.status(400).json({
                    error: 'An error occured'
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};