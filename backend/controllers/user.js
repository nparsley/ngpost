const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'user created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        // error: err
        // error: {
          message: 'invalid authentication credentials'
        // }
      })
    });
  });

}


exports.userLogin = (req, res, next) => {
  let fetchedUser;
  // valid email match
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'auth failed'
      });
    }
    fetchedUser = user;
    // compare pw
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'auth failed'
      });
    }
    // create jwt
    const token = jwt.sign({
      // email: user.email,
      // userId: user._id
      email: fetchedUser.email,
      userId: fetchedUser._id
    }, 'secret_this_pw', { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'invalid authentication credentials'
    });
  });
}
