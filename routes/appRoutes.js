const express = require('express');
const router = express.Router();
const { APPLICATION, GET_SESSION, SET_SESSION, DELETE_SESSION, ERROR_404 } = require('../controllers/appController.js');


router.get("", APPLICATION);

router.get("/session", GET_SESSION);

router.post("/session/set", SET_SESSION);

router.delete("/session/delete", DELETE_SESSION);

/**
 * ERROR 404 : redirect to '/'
 */
router.get(/.*/, ERROR_404);



module.exports = router;