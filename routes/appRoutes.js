const express = require('express');
const router = express.Router();
const { APPLICATION, GET_SESSION, SET_SESSION } = require('../controllers/appController.js');


router.get("", APPLICATION);

router.get("/session", GET_SESSION);

router.post("/session/set", SET_SESSION);



module.exports = router;