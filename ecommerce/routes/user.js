const express = require('express');
const router = express.Router();
const { userByID, read, update } = require('../controllers/user');

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

router.param('userID', userByID);

router.get('/secret/:userID', requireSignIn, isAuth, isAdmin, (req, res) => {
    return res.json({
        user: req.profile
    })
});

router.get('/user/:userID', requireSignIn, isAuth, read);

router.put('/user/:userID', requireSignIn, isAuth, update);


module.exports = router;