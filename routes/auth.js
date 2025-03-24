const express = require('express')
const router = express.Router()

const authHandler = require('./handler/auth')

router.post("/register", authHandler.register);
router.post("/login", authHandler.login);
router.post("/logout", authHandler.logout);

module.exports = router