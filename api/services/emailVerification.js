var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var config = require('./config.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var model = {
  verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
  title: 'Job Finder',
  subTitle: 'Thanks for signing up!',
  body: 'Please verify your email address by clicking the verify button below.'
}

exports.send = function(email) {
  var payload = {
    sub: email
  }

  var token = jwt.encode(payload, config.EMAIL_SECRET);

  var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    secure: true,
    auth: {
      user: 'chase.w.simpson1@gmail.com',
      pass: config.SMTP_PASS
    }
  }));

  var mailOptions = {
    from: 'Job Finder <chase.w.simpson1@gmail.com>',
    to: email,
    subject: 'Job Finder Account Verification',
    html: getHtml(token)
  };

  transporter.sendMail(mailOptions, function(err, info) {
    // if(err) return res.status(500, err);

    // console.log('email sent', info.response);
  })
}

function getHtml(token) {
  var path = './views/emailVerification.html';
  var html = fs.readFileSync(path, encoding = 'utf8');

  var template = _.template(html);

  model.verifyUrl += token;

  return template(model);
}

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
