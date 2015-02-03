var jwt = require('jwt-simple');

module.exports = function(req, res) {
  if(!req.headers.authorization) {
    return res.status(401).send({
      message: ', please register to view jobs.'
    });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, "shhh..");

  if(!payload.sub) {
    res.status(401).send({
      message: 'Authentication failed'
    });
  }

  res.json(jobs);
};

var jobs = [
'Cook',
'SuperHero',
'Front End Developer',
'Unicorn Whisperer'
];
