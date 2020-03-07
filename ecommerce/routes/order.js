const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth } = require('../controllers/auth');

const { userByID } = require('../controllers/user');

const { create, addOrderToUserHistory } = require('../controllers/order');

router.post('/order/create/:userID', requireSignIn, isAuth,addOrderToUserHistory, create);

router.param('userID', userByID);

module.exports = router;