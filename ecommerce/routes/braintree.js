const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth } = require('../controllers/auth');

const { userByID } = require('../controllers/user');

const { generateToken, processPayment } = require('../controllers/braintree');

router.get('/braintree/getToken/:userID', requireSignIn, isAuth, generateToken)

router.post('/braintree/payment/:userID', requireSignIn, isAuth, processPayment);

router.param('userID', userByID);

module.exports = router;