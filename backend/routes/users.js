const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

const rateLimit = require('../middlewares/rate');

router.post('/signup', rateLimit, usersCtrl.signup);
router.post('/login', rateLimit, usersCtrl.login);

module.exports = router;