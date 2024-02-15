var express = require('express');
var router = express.Router();
const movieCtrl = require('../controllers/movies')

//get requests to  /movies/new
router.get('/new', movieCtrl.new)
//Post request to /movies
router.post('/', movieCtrl.create)

module.exports = router;
