const con = require('../db');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


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


//user sign up controller
exports.signUp = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var salt = uuidv4();
    var password = crypto.createHmac('sha1', salt).update(req.body.password).digest('hex');
    var sql = `INSERT INTO
                      users (name, email, password, salt)
                    VALUES
                      (
                        '${req.body.name}',
                        '${req.body.email}',
                        '${password}',
                        '${salt}'
                      )`;
    con.query(sql, function(err, result) {
        if (err) return res.status(422).json({ errors: [{ msg: Object.values(err)[2] }] });
        return res.json({ success: true });
    });
};

//user sign in controller
exports.signIn = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //find the user based on email
    const { email, password } = req.body;
    var sql = `SELECT
                  *
                FROM
                  users
                WHERE
                  email = '${email}'`;
    con.query(sql, function(err, result) {
        if (err) throw err;

        if (result.length) {
            var salt = result[0].salt;
            var password_new = crypto.createHmac('sha1', salt).update(password).digest('hex');
            if (password_new == result[0].password) {
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET);
                res.cookie('t', token, { expire: new Date() + 9999 });
                const { id, name, email, role } = result[0];
                return res.status(200).json({ 'token': token, 'user': { id, name, email, role } });
            } else {
                return res.status(401).json({
                    errors: [{ 'msg': 'Wrong Password' }]
                });
            }
        } else {
            return res.status(400).json({
                errors: [{ 'msg': 'No User Found' }]
            });
        }
    });
};

//user sign out controller
exports.signOut = (req, res) => {
    res.clearCookie('t');
    res.json({ 'message': 'Signout success' });
};

//middleware for routes required sign in
exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
});

//middleware to check of the user is authenticated
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile.id == req.auth.id;
    if (!user) {
        return res.status(403).json({
            errors: [{ msg: "access denied" }]
        });
    }
    next();
};

//middleware to check if the user is admin
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            errors: [{ msg: 'Admin resource! Access denied' }]
        });
    }
    next();
}


//update a user
exports.update = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var sql = '';
    if (req.body.password) {
        //update the password
        var salt = uuidv4();
        var password = crypto.createHmac('sha1', salt).update(req.body.password).digest('hex');
        sql = `, password = '${password}', salt = '${salt}'`;
    }

    sql = `UPDATE
              users
            SET
              name = '${req.body.name}',
              email = '${req.body.email}'
              ${sql}
            WHERE
              id = ${req.profile.id}`;

    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.affectedRows) {
            const token = jwt.sign({ id: req.profile.id }, process.env.JWT_SECRET);
            res.cookie('t', token, { expire: new Date() + 9999 });
            return res.status(200).json({ 'token': token, 'user': { 'id': req.profile.id, 'name': req.body.name, 'email': req.body.email, 'role': req.profile.role } });
        } else {
            return res.status(400).json({
                errors: [{ 'msg': 'An error occured' }]
            });
        }
    });
};


exports.purchaseHistory = (req, res) => {

    sql = `SELECT * FROM orders WHERE user = '${req.profile.id}' ORDER BY orders.ID DESC `;

    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.length) {
            return res.status(200).json({ orders: result });
        } else {
            return res.status(400).json({
                orders: [],
                not_found: true
            });
        }
    });
}