const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://postappng:" + process.env.MONGO_ATLAS_PW + "@cluster0.7f3jr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", )
  .then(() => {
    console.log('connected to database')
})
  .catch(() => {
    console.log('connection failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// app.use((req, res, next) => {
//   console.log('first middleware')
//   next();
// });



app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);


module.exports = app;




