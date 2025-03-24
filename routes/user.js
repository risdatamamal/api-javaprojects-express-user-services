const express = require('express')
const router = express.Router()

const userHandler = require('./handler/user')

router.get("/:id", userHandler.getUser);
router.put("/:id", userHandler.updateUser);

module.exports = router