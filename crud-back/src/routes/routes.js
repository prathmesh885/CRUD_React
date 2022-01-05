const express = require('express')
const router = express.Router();

const userController = require("../controller/controller");

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.delete);

router.get('/get', userController.findAll)

router.post('/add', userController.create);

module.exports = router;
