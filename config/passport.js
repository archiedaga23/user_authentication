const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const secret = require('./key').secretKey;
const User = require('../model/User');

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({username: jwt_payload.username})
      .then(user => {
        if (user) {
          return done(null, user);
        }
        else {
          return done(null, false);
        }
      })
      .catch(err => {
          return done(null, false);
      })
  }))
}