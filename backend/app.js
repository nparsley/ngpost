const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('first middleware')
//   next();
// });



app.use('/api/posts', (req, res, next) => {
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




