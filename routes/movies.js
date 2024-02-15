var express = require('express');
var router = express.Router();
const movieCtrl = require('../controllers/movies')

router.get('/new', movieCtrl.new)

module.exports = router;
