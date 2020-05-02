const express = require('express');
const router = express.Router();
const { signUp, signIn, signOut, update, requireSignIn, isAuth, isAdmin, userByID, read, purchaseHistory } = require('../controllers/user');
const { userSignupValidator, userSigninValidator, userUpdateValidator } = require('../validator/user');

router.param('userID', userByID);

router.post('/signup', userSignupValidator, signUp);
router.post('/signin', userSigninValidator, signIn);
router.get('/signout', signOut);
router.put('/user/:userID', userUpdateValidator, requireSignIn, isAuth, update);
router.get('/user/:userID', requireSignIn, isAuth, read);
router.get('/user/orders/all/:userID', requireSignIn, isAuth, purchaseHistory);

router.get('/secret/:userID', requireSignIn, isAuth, isAdmin, (req, res) => {
    return res.json({
        user: req.profile
    })
});

module.exports = router;