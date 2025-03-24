const express = require('express')
const router = express.Router()

const usersHandler = require('./handler/users')

router.get("/", usersHandler.getUsers);

module.exports = router