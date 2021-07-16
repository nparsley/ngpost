const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://postappng:postappng@cluster0.7f3jr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected to database')
})
  .catch(() => {
    console.log('connection failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// app.use((req, res, next) => {
//   console.log('first middleware')
//   next();
// });

app.post('/api/posts', (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(post);
  post.save();
  res.status(201).json({
    message: 'post added successfully'
  });
});



// app.use('/api/posts', (req, res, next) => {
  app.get('/api/posts', (req, res, next) => {
  // res.send('hello express');

  const posts = [
    {
      id: 'numberone',
      title: 'first server side post',
      content: 'this is from server'
    },
    {
      id: 'numbertwo',
      title: 'second server side post',
      content: 'this is from server--'
    },
  ];
  // res.json(posts);
  res.status(200).json({
    message: 'posts fetched successfully',
    posts: posts
  });
});


module.exports = app;




