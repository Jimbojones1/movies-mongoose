// import our model so we can talk to the database and perfomr
// our CRUD operations
const MovieModel = require('../models/movie')

module.exports = {
	new: newMovie,
	create: create,
	index
	// or 
	// create
}

async function index(req, res){
	
	// then we want to send a ejs page with all the movies to the browser
	try {
		// We want our model to go to the database and get all the movies
		// .find({}) is mongoose model query method
		const movieDocumentsFromTheDB = await MovieModel.find({})
		console.log(movieDocumentsFromTheDB)
		// then we want to send a ejs page with all the movies to the browser
		// movies/index is looking in the views folder for the ejs page
		res.render('movies/index', {movieDocs: movieDocumentsFromTheDB})
		// movieDocs is now a variables inside of views/movies/index.ejs 
	} catch(err){
		console.log(err)
		res.redirect('/')
	}
}

async function create(req, res){
	console.log(req.body, " <- is the contents of our form!")
	req.body.nowShowing = !!req.body.nowShowing // !! forces the value to a boolean
	  // remove any whitespace at start and end of cast
	req.body.cast = req.body.cast.trim();
	  // split cast into an array if it's not an empty string - using a regular expression as a separator
	if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);

	try {
		// await says, wait for the model to finish going to mongodb
		// atlas and coming back before you run the code after it!

		// ONLY USE AWAIT ON YOUR MODEL QUERY! for right now
		const createdMovieDoc = await MovieModel.create(req.body);
		console.log(createdMovieDoc)
		// for now redirect to new page
		res.redirect('/movies/new')
	} catch(err){
		console.log(err)
		res.redirect('/movies/new')
	}
}

function newMovie(req, res){

	// res.render looks in our 
	// views folder for the ejs page
	res.render('movies/new')
}

