const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


exports.log_in = async function (req, res) {

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send('Invalid email or password');

  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });


};


exports.changePassword = async function (req, res) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    const oldPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    try {
      const user = jwt.verify(token, "secretkey");

      const _id = user.user._id;

      const validPassword = await bcrypt.compare(oldPassword, user.user.password);

      if (validPassword) {
        const password = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id }, { $set: { password } });
        res.json({ status: "ok" });
      }
      else {
        res.send("Current Password is incorrect ");
      }
    } catch (err) {
      next(err)
    }

  }
  else {
    res.status(401).send("Unauthorized Access");
  }


}



exports.Forgotpassword = async function (req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Email is incorrect")

    const JWT_SECRET_KEY = 'secretkey'
    const secret = JWT_SECRET_KEY + user.password;

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: "60m" });

    user.reset_token = token
    await user.save();

    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: "devcamper123@gmail.com",
          pass: "devcamper1234567",
        },
      })
    );

    var mailOptions = {
      from: 'devcamper123@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js[nodemailer]',
      text: token
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send(token);

  } catch (err) {
    return res.status(500).send("Something went wrong!");
  }

}



exports.resetpassword = async function (req, res) {

  try {

    jwt.verify(req.body.token, 'secretkey', async (err, authData) => {
      if (err) {
        next(err)
      } else {

        let user = await User.findById({ _id: authData.id })
        if (!user) {
          return res.status(401).send("Unsuccesful");
        }
        if (user.reset_token != req.body.token) {
          return res.status(401).send("Unsuccesful");

        }
        user.password = req.body.newPassword;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user)

      }
    });
  }
  catch (err) {
    return res.status(500).send("Something went wrong!");
  }

}