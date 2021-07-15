const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
  // title: String,
  // content: String
  title: { type: String, rquired: true },
  content: { type: String, required: true }
});


//name of model + schema used
module.exports = mongoose.model('Post', postSchema);













