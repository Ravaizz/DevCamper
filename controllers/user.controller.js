const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async function (req, res) {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save((err, user) => {
    if (err) { return next(err) };
    res.send(user);
  });

};