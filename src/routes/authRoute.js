const express = require('express');

const router = express.Router();

const { getAuthUrl, getAuthToken } = require('../controllers');

router.get('/auth', getAuthUrl);
router.get('/callback', getAuthToken);

module.exports = {
    authRouter: router
};
