const express = require('express');
const router = express.Router();
const { create, productByID, read, remove, update, list, listRelated, listCategories, listBySearch } = require('../controllers/product');

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

const { userByID } = require('../controllers/user');

router.param('userID', userByID);
router.param('productID', productByID);

router.post('/product/create/:userID', requireSignIn, isAuth, isAdmin, create);
router.get('/product/:productID', requireSignIn, isAuth, isAdmin, read);
router.delete('/product/:productID/:userID', requireSignIn, isAuth, isAdmin, remove);
router.put('/product/:productID/:userID', requireSignIn, isAuth, isAdmin, update);
router.get('/products', list);
router.get('/products/related/:productID', listRelated);
router.get('/products/categories', listCategories);

router.post('/products/by/search', listBySearch);

module.exports = router;

