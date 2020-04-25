const express = require('express');
const router = express.Router();
const { signUp, signIn, signOut, update, requireSignIn, isAuth, isAdmin, userByID, read } = require('../controllers/user');
const { userSignupValidator, userSigninValidator } = require('../validator/user');

router.param('userID', userByID);

router.post('/signup', userSignupValidator, signUp);
router.post('/signin', userSigninValidator, signIn);
router.get('/signout', signOut);
router.put('/user/:userID', userSignupValidator, requireSignIn, isAuth, update);
router.get('/user/:userID', requireSignIn, isAuth, read);

router.get('/secret/:userID', requireSignIn, isAuth, isAdmin, (req, res) => {
    return res.json({
        user: req.profile
    })
});

module.exports = router;