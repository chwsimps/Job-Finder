var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(user, res) {
  var payload = {
    sub: user.id //subject
  }

  var token = jwt.encode(payload, "shhh..");

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}
