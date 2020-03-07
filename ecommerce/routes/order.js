const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

const { userByID } = require('../controllers/user');

const { create, decreaseQuantity, listOrders, getStatusValues, updateOrderStatus, orderByID } = require('../controllers/order');

router.post('/order/create/:userID', requireSignIn, isAuth, decreaseQuantity, create);

router.get('/order/list/:userID', requireSignIn, isAuth, isAdmin, listOrders);

router.get('/order/status-values/:userID', requireSignIn, isAuth, isAdmin, getStatusValues);

router.put('/order/:orderID/status/:userID', requireSignIn, isAuth, isAdmin, updateOrderStatus);

router.param('userID', userByID);
router.param('orderID', orderByID);

module.exports = router;