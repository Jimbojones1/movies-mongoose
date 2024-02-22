const MovieModel = require('../models/movie')


module.exports = {
	create
}

async function create(req, res){
	// To find the movie!
	console.log('====================================')
	console.log(req.user, "< ---- req.user")
	console.log('====================================')
	try {
		// req.params.id comes from the http request from the reviews form on the 
		// movies show page (.id name comes from the routes/reviews route)
		const movieDoc = await MovieModel.findById(req.params.id)
		// movieDoc is the movie from the database
		
		// Add the users information the review
		req.body.user = req.user._id
		req.body.userName = req.user.name
		req.body.userAvatar = req.user.avatar
		// the left side, keys must match 
		// the review schema

		// the req.user has the keys of the the userSchema

		// Then add the review to the movie's reviews array
		movieDoc.reviews.push(req.body); // add the contents of the review form (req.body),
		// to the reviews array
		// since we're mutating (changing) the movieDoc, we have to tell the database
		await movieDoc.save() // this tells the db we added a review to the movie we found!
		// then respond to the client
		res.redirect(`/movies/${req.params.id}`)
		// this tells the browser to make a get request 
		// to /movies/23974981738921
		// res.redirect(`/movies/${movieDoc._id}`)

	} catch(err){
		console.log(err)
		res.send(err)
	}
	


}