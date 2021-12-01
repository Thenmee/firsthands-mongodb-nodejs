//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var Tweet = mongoose.model(
  "Tweet",
  new Schema({
  title: {
    type: String,
    minlength: [20, 'The Title should has at least 20 characters!'],
    required: [true, "Must include title"],
  },
  tweet: {
    type: String,
    maxlength: [50, 'The Tweet Not be more than 50 characters!'],
    required: [true, "Must include tweet"],
  },
  createdAt: Date,
})
);
module.exports = Tweet;
