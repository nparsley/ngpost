const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
  // title: String,
  // content: String
  title: { type: String, rquired: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  // store user info
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


//name of model + schema used
module.exports = mongoose.model('Post', postSchema);













