//imports
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const Doctor = require("../models/doctors");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "covid"
};

//passport setup
passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    Doctor.findById(jwtPayLoad._id, function (error, doctor) {
      if (error) {
        console.log("Error in finding the doctor from JWT");
        return;
      }
      if (doctor) {
        return done(null, doctor);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;