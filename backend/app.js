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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
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
  post.save().then(createdPost => {
    // console.log(createdPost);
    res.status(201).json({
      message: 'post added successfully',
      postId: createdPost._id
    });
  });

});


app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    conent: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    // console.log(result);
    res.status(200).json({message: 'update success'});
  });
});


// app.use('/api/posts', (req, res, next) => {
  app.get('/api/posts', (req, res, next) => {
/*   // res.send('hello express');

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
  // res.json(posts); */

  // fetching posts from database
  Post.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message: 'posts fetched successfully',
      posts: documents
    });
  });

});


app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'post not found'});
    }
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'post deleted'});
  });

});




module.exports = app;




