// THE PURPOSE OF THIS FILE
// is to create and export our object Model (which we use in our controllers)
// The model performs cruds operations on the movies collection in our movies database!
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Enforces the shape of the documents (Think of objects)
// in our mongodb movies collection
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String],
  nowShowing: Boolean
}, {
  timestamps: true
});
	
// Compile the schema into a model and export it
// Movie, creates a movies collection in our movies database
module.exports = mongoose.model('Movie', movieSchema);