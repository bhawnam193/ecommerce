const express = require('express');
const router = express.Router();
const { create, categoryByID, read, update, remove, list } = require('../controllers/category');

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

const { userByID } = require('../controllers/user');

router.param('userID', userByID);
router.param('categoryID', categoryByID);

router.post('/category/create/:userID', requireSignIn, isAuth, isAdmin, create);

router.get('/category/:categoryID', read);

router.put('/category/:categoryID/:userID', requireSignIn, isAuth, isAdmin, update);

router.delete('/category/:categoryID/:userID', requireSignIn, isAuth, isAdmin, remove);

router.get('/categories', list);

module.exports = router;