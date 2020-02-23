const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth } = require('../controllers/auth');

const { userByID } = require('../controllers/user');

const { generateToken } = require('../controllers/braintree');

router.get('/braintree/getToken/:userID', requireSignIn, isAuth, generateToken)

router.param('userID', userByID);

module.exports = router;