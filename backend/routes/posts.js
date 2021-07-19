const express = require('express');

const Post = require('../models/post');


const router = express.Router();

// router.post('/api/posts', (req, res, next) => {
  router.post('', (req, res, next) => {
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



// router.put('/api/posts/:id', (req, res, next) => {
  router.put('/:id', (req, res, next) => {
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
  router.get('', (req, res, next) => {
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


router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'post not found'});
    }
  });
});

router.delete('/:id', (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'post deleted'});
  });

});


module.exports = router;










