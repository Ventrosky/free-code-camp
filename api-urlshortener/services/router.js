const express = require('express');
const router = new express.Router();
const urlsc = require('../controllers/urlcontroller.js');


router.route('/shorturl/:url(*)')
    .get(urlsc.get)
    .post(urlsc.post);


module.exports = router;