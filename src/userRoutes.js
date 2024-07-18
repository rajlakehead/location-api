const express = require('express');
const { findUsers } = require('./userController.js');

const router = express.Router();

router.get('/users', findUsers);

module.exports = router;
