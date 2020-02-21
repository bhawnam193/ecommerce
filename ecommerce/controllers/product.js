const formidable = require('formidable');
const con = require('../db');
var appRoot = require('app-root-path');

exports.productByID = (req, res, next, id) => {
    try {
        var sql = `SELECT
                      *
                    FROM
                      products
                    WHERE
                      ID = ${id}`;

        con.query(sql, function(err, result) {

            if (err) throw err;

            if (result.length) {
                req.product = result[0];
                next();
            } else {
                return res.status(400).json({
                    errors: [{ msg: 'No Product Found' }]
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

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = appRoot + '/uploads/products';

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                errors: [{ msg: 'Image could not be uploaded' }]
            });
        }

        if ( Object.keys(files).length === 0 && files.constructor === Object ) {
            return res.status(400).json({
                errors: [{ msg: 'Image is required' }]
            });
        }

        //1mb size max size of file
        if (files && files.image.size > 1000000) {
            return res.status(400).json({
                errors: [{ msg: 'Image size exceeds 1MB' }]
            });
        }
        var filename = files.image.path.replace(/\\\\/g, '\\').replace(appRoot, '').replace(/\\/g, "/");

        //check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                errors: [{ msg: 'All fields are required' }]
            });
        }

        try {
            var sql = `INSERT INTO
                          products (
                            name,
                            description,
                            price,
                            category,
                            quantity,
                            image,
                            shipping
                          )
                        VALUES
                          (
                            '${name}',
                            '${description}',
                            ${parseInt(price)},
                            ${category},
                            ${parseInt(quantity)},
                            '${filename}',
                            ${parseInt(shipping)}
                          )`;

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
    });
};


exports.read = (req, res) => {
    return res.status(200).json({
        product: req.product
    });
};


exports.remove = (req, res) => {
    let product = req.product;
    try {
        var sql = `DELETE FROM
                      products
                    WHERE
                      ID = ${product.ID}`;

        con.query(sql, function(err, result) {
            if (err) throw err;

            if (result.affectedRows) {
                return res.status(200).json({
                    success: true,
                    deleted: true
                });
            } else {
                return res.status(400).json({
                    errors: [{ msg: 'An error occured' }]
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};


exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = appRoot + '/uploads/products';

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        //1mb size max size of file
        if (files.image.size > 1000000) {
            return res.status(400).json({
                error: 'Image size exceeds 1MB'
            });
        }
        var filename = files.image.path.replace(/\\\\/g, '\\').replace(appRoot, '').replace(/\\/g, "/");

        //check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = req.product;

        try {
            var sql = `UPDATE
                          products
                        SET
                          name = '${name}',
                          description = '${description}',
                          price = ${price},
                          category = ${category},
                          quantity = ${quantity},
                          image = '${filename}',
                          shipping = ${shipping}
                        WHERE
                          ID = ${product.ID}`;

            con.query(sql, function(err, result) {
                if (err) throw err;
                return res.status(200).json({
                    updated: true
                });
            });
        } catch (err) {
            return res.status(422).json({
                errors: err.array()
            });
        }
    });
};

/**
 * Sell / Arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4&offset=0
 * by arrival = /products?sortBy=created&order=desc&limit=4&offset=0
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'ASC';
    let sortBy = req.query.sortBy ? req.query.sortBy : 'ID';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    let offset = req.query.offset ? req.query.offset : 0;

    try {
        var sql = `SELECT
                      *
                    FROM
                      products
                    ORDER BY
                      ${sortBy} ${order}
                    LIMIT
                      ${limit} OFFSET ${offset}`;

        con.query(sql, function(err, result) {
            if (err) throw err;
            if (result.length) {
                return res.status(200).json({
                    result
                });
            } else {
                return res.status(400).json({
                    errors: [{msg: 'No Product Found'}]
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
}

/**
 * It will find the products based on the req product category
 * other products that has the same category will be returned
 */
exports.listRelated = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const product = req.product;

    try {
        var sql = `SELECT
                      *
                    FROM
                      products
                    WHERE
                      category = ${product.category}
                      AND ID != ${product.ID}
                    LIMIT
                      ${limit}`;

        con.query(sql, function(err, result) {
            if (err) throw err;
            if (result.length) {
                return res.status(200).json({
                    result
                });
            } else {
                return res.status(400).json({
                    error: 'No Product Found'
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};


exports.listCategories = (req, res) => {

    try {
        var sql = `SELECT
                      DISTINCT p.category AS id,
                      c.name AS name
                    FROM
                      products p
                      JOIN category c
                    WHERE
                      p.category = c.ID`;

        con.query(sql, function(err, result) {
            if (err) throw err;
            if (result.length) {
                return res.status(200).json({
                    result
                });
            } else {
                return res.status(400).json({
                    errors: 'No Category Found'
                });
            }
        });
    } catch (err) {
        return res.status(422).json({
            errors: err.array()
        });
    }
};

/**
 *list products by search
 * we will implment product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
exports.listBySearch = (req, res) => {
    let order = req.query.order ? req.query.order : 'ASC';
    let sortBy = req.query.sortBy ? req.query.sortBy : 'ID';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    let offset = req.query.offset ? req.query.offset : 0;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                //gte - greater than [0-10]
                //lte - less than
                findArgs[key] = {

                }
            }
        }
    }
};