const express = require('express');
const router = express.Router();
const con = require('../db');
const { signUp, signIn, signOut, requireSignIn } = require('../controllers/auth');
const { userSignupValidator, userSigninValidator } = require('../validator/auth');

router.post('/signup', userSignupValidator, signUp);
router.post('/signin', userSigninValidator, signIn);
router.get('/signout', signOut);

router.get('/hello', requireSignIn, (req, res) => {
    res.send("hello there");
});

module.exports = router;