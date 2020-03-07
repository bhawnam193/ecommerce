const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

const { userByID } = require('../controllers/user');

const { create, decreaseQuantity, listOrders } = require('../controllers/order');

router.post('/order/create/:userID', requireSignIn, isAuth, decreaseQuantity, create);

router.get('/order/list/:userID', requireSignIn, isAuth, isAdmin, listOrders);

router.param('userID', userByID);

module.exports = router;