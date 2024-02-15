
module.exports = {
	new: newMovie
}

function newMovie(req, res){

	// res.render looks in our 
	// views folder for the ejs page
	res.render('movies/new')
}