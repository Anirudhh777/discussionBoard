// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');
// create our friendSchema
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
  post: String,
  up_vote: Number,
  down_vote: Number,
  user_name: String,
  _User: {type: Schema.Types.ObjectId, ref: 'User'},
  _Topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  created_at: Date
});

// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('Post', PostSchema);