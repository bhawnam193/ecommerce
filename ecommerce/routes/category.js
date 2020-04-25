const express = require('express');
const router = express.Router();

const { create, categoryByID, read, update, remove, list } = require('../controllers/category');
const { categoryValidator } = require('../validator/category');
const { requireSignIn, isAuth, isAdmin, userByID } = require('../controllers/user');

router.param('userID', userByID);
router.param('categoryID', categoryByID);

router.post('/category/create/:userID', categoryValidator, requireSignIn, isAuth, isAdmin, create);
router.get('/category/:categoryID', read);
router.put('/category/:categoryID/:userID', requireSignIn, isAuth, isAdmin, update);
router.delete('/category/:categoryID/:userID', requireSignIn, isAuth, isAdmin, remove);
router.get('/categories', list);

module.exports = router;