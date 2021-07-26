const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    // get jwt to store
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_pw');
    next();
  } catch (error) {
    res.status(401).json({
      message: 'auth failed'
    });
  }




};



