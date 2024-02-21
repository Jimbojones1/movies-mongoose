const PerformerModel = require("../models/performer");
const MovieModel = require('../models/movie')

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

async function addToCast(req, res){
	
	
	try {
		// Find the movie (req.params comes from the http request)
		const movieDoc = await MovieModel.findById(req.params.movieId);
		// add the performers id to the movieDoc.cast array
		movieDoc.cast.push(req.body.performerId);
		// we mutated the movieDoc, so we have to tell the database!
		await movieDoc.save()
		// redirect the client back to the movies show page!
		res.redirect(`/movies/${req.params.movieId}`)


	} catch(err){
		console.log(err)
		res.send(err)
	}

}

async function create(req, res) {
	// Need to "fix" date formatting to prevent day off by 1
	// This is due to the <input type="date"> returning the date
	// string in this format:  "YYYY-MM-DD"
	// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
	const s = req.body.born;
	// reformatting the date to match the schema defined in the performer model file
	req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  
  
  
	try {
									/// Peforfomer.create is our model using the create method 
									// to take the contents of the form (req.body), and go all the 
									// way to mongodb atlas, to create a new document in the performers
									// collection
  
									// createdPerformer is the variable that holds the result 
									// of Performer.create which is the document you created in the 
									// database
	  const createdPerformer = await PerformerModel.create(req.body);
	  console.log(createdPerformer, " <- createdPerformer")
	  // tell the client to make a GET request to /performers/new
	  res.redirect("/performers/new");
	} catch (err) {
	  // if there is an error send back the object 
	  res.send(err);
	}
  }
  
  async function newPerformer(req, res) {
	try {
	  const allPerformers = await PerformerModel.find({});
	  res.render("performers/new", {
		title: "Add Performer",
		performers: allPerformers,
	  });
	} catch (err) {
	  res.send(err);
	}
  }