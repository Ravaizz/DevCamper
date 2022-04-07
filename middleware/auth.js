const jwt = require('jsonwebtoken');


exports.protect = async function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
      if (err) {
        next(err)
      }
      else{
             req.userId= decoded;
          }

    });
    next();
  } else {
    res.status(401).send("Unauthorized Access");
  }
}


