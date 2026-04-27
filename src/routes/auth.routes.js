const express = require('express');
const router = express.Router();
const { postRegister } = require('../controller/auth.controller');

// Register route
router.post('/register', postRegister);

module.exports = router;