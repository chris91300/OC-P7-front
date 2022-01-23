const express = require('express');
const router = express.Router();
const { APPLICATION } = require('../controllers/appController.js');


router.get("", APPLICATION);



module.exports = router;