const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // error handling
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('invalid mime type');
    if (isValid) {
      error = null;
    }

    // cb(null, 'backend/images');
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});




// router.post('/api/posts', (req, res, next) => {
  // router.post('', (req, res, next) => {
    router.post('', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
      const url = req.protocol + '://' + req.get('host');
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  // console.log(req.userData);
  // return res.status(200).json({});

  // console.log(post);
  post.save().then(createdPost => {
    // console.log(createdPost);
    res.status(201).json({
      message: 'post added successfully',
      // postId: createdPost._id
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath
        // ...createdPost,
        // id: createdPost._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'creating a post failed'
    });
  });

});



// router.put('/api/posts/:id', (req, res, next) => {
  router.put('/:id', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  // console.log(req.file);
  let imagePath = req.body.imagePath;

  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    conent: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  console.log(post);
  Post.updateOne({_id: req.params.id, creator: req.userData.Id }, post).then(result => {
    // console.log(result);
    if (result.nModified > 0) {
      res.status(200).json({message: 'update success'});
    } else {
    res.status(401).json({message: 'not authorized'});
    }
    // res.status(200).json({message: 'update success'});
  })
  .catch(error => {
    res.status(500).json({
      message: 'could not update post'
    })
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

  //backend pagination
  // console.log(req.query);
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }

  // fetching posts from database
  // Post.find().then(documents => {
    postQuery.then(documents => {
    // console.log(documents);
    fetchedPosts = documents;
      return Post.count();
  }).then(count => {
    res.status(200).json({
      message: 'posts fetched successfully',
      // posts: documents
      posts: fetchedPosts,
      maxPosts: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'fetching posts failed'
    })
  });

});


router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'post not found'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'fetching post failed'
    })
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId }).then(result => {
    console.log(result);
    // res.status(200).json({message: 'post deleted'});
    if (result.n > 0) {
      res.status(200).json({message: 'deletion success'});
    } else {
    res.status(401).json({message: 'not authorized'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'fetching posts failed'
    })
  });

});


module.exports = router;










