var express = require('express');
var router = express.Router();
const movieCtrl = require('../controllers/movies')

// all of these routes are prepended with /movies
// because of this line of code in the server.js
// app.use('/movies', movieRouter);

// GET request to /movies 
router.get('/', movieCtrl.index)
//get requests to  /movies/new
router.get('/new', movieCtrl.new)

// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', moviesCtrl.show);
//Post request to /movies
router.post('/', movieCtrl.create)

module.exports = router;
