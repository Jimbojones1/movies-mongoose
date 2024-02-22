// THE PURPOSE OF THIS FILE
// is to create and export our object Model (which we use in our controllers)
// The model performs cruds operations on the movies collection in our movies database!
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// ONE MOVIE HAS MANY REVIEWS
// A REVIEW BELONGS TO A MOVIE (Using mongoose embedding to implement the relationship)

// when we use embedding we define the schemas of the relationship in the same file
// Referencing (each data entity) gets its own model file
const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, {
  timestamps: true
})




// Enforces the shape of the documents (Think of objects)
// in our mongodb movies collection
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  nowShowing: Boolean,

  // Many to Many Relationship
  // Move has many performers, Performers has many Movies
  // using referencing!
  cast: [{
    type: Schema.Types.ObjectId, // this is from mongoose
    ref: 'Performer' // Performer is referencing the model name that 
    // you are creating the relationship with, mongoose.model('Performer', performerSchema);
  }],
  // One movie has many reviews, A review belongs to a movie 
  // Using embedding on the one side of the relationship
  reviews: [reviewSchema]
}, {
  timestamps: true
});
	
// Compile the schema into a model and export it
// Movie, creates a movies collection in our movies database
module.exports = mongoose.model('Movie', movieSchema);





// const ticketSchema = new Schema({
//   seat: String, 
//   price: Number,
//   // One to many relationship
//   // on the belongs to side
//   // ticket belongs to this flight
//   flight: { 
//     type: Schema.Types.ObjectId, // this is from mongoose
//     ref: 'Flight'
//    }
// })