const { body, check } = require('express-validator');

exports.categoryValidator = [
    body('name', 'Name is required').not().isEmpty().isLength({ min: 3 }).withMessage('Name must have 3 characters').isLength({ max: 32 }).withMessage('Max 32 characters allowed').trim().escape(),
];