const { body, check } = require('express-validator');

exports.userSignupValidator = [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('email', 'Invalid Email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
];

exports.userSigninValidator = [
    body('email', 'Invalid Email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
];

exports.categoryCreateValidator = [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
];