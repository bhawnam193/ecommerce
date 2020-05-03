const { body, check } = require('express-validator');

exports.userSignupValidator = [
    body('name', 'Name is required').not().isEmpty().isLength({ min: 3 }).withMessage('Name must have 3 characters').isLength({ max: 50 }).withMessage('Name cannot have more than 50 characters').trim().escape(),
    body('email', 'Invalid Email').isEmail().normalizeEmail(),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
];

exports.userSigninValidator = [
    body('email', 'Invalid Email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
];

exports.userUpdateValidator = [
    body('name', 'Name is required').not().isEmpty().isLength({ min: 3 }).withMessage('Name must have 3 characters').isLength({ max: 50 }).withMessage('Name cannot have more than 50 characters').trim().escape(),
    body('email', 'Invalid Email').isEmail().normalizeEmail(),
    check('password').optional({ checkFalsy: true }).isLength({ min: 6 }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
];