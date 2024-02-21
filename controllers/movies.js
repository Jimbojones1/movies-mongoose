// import our model so we can talk to the database and performs
// our CRUD operations
const MovieModel = require('../models/movie')
const PeformerModel = require('../models/performer');

module.exports = {
	new: newMovie,
	create: create,
	index,
	show
	// or 
	// create
}

async function show(req, res) {

  
	try {
  
		// req.params.id value is coming from the browsers request
		// the name `.id` is defined in the routes/movies show route
		// router.get('/:id', movieCtrl.show);
	  const movieFromTheDatabase = await MovieModel.findById(req.params.id)
									
  
									
  
	  console.log(movieFromTheDatabase);
	  // For the dropdown for the addToCast
	  // We need to search the database for all of the performers
	  // whose id is NOT in the movieFromTheDatbase.cast array. 
		const performersNotInTheMovie = await PerformerModel.find({_id: {$nin: movieFromTheDatabase.cast}})
		// $nin -  Mongodb comparison query operators <- google to view these
  

		// express is changing the ejs into html and sending it to the browser (client side/frontend)
	  res.render("movies/show", {
		movie: movieFromTheDatabase, // the key movie, becomes a variable name in the show.ejs
		performers: performersNotInTheMovie
	  });
	} catch (err) {
	  res.send(err);
	}
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

async function create(req, res) {
	// convert nowShowing's checkbox of nothing or "on" to boolean
	req.body.nowShowing = !!req.body.nowShowing;
	// remove any whitespace at start and end of cast
  
  
	// Remove empty properties so that defaults will be applied
	for (let key in req.body) {
	  if (req.body[key] === "") delete req.body[key];
	}
	try {
	  const movieFromTheDatabase = await MovieModel.create(req.body); // the await is waiting for the MovieModel to go to MongoDB ATLAS (our db) a
	  //and put the contents form in the db, and come back to the express server
  
	  // if you want to see what you put in the database on your server
	  console.log(movieFromTheDatabase);
  
	  // Always redirect after CUDing data
	  // We'll refactor to redirect to the movies index after we implement it
	  res.redirect(`/movies/${movieFromTheDatabase._id}`); // Update this line
	} catch (err) {
	  // Typically some sort of validation error
	  console.log(err);
	  res.render("movies/new", { errorMsg: err.message });
	}
  }
  

function newMovie(req, res){

	// res.render looks in our 
	// views folder for the ejs page
	res.render('movies/new')
}

