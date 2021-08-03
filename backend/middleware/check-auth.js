const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    // get jwt to store
    const token = req.headers.authorization.split(' ')[1];
    // jwt.verify(token, 'secret_this_pw');
    const decodedToken = jwt.verify(token, 'secret_this_pw');
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'you are not authenticated'
    });
  }

};



