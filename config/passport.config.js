const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require('../app/services/user.service');

passport.use(
  new LocalStrategy((username, password, done) => {
    userService
      .loginUser(username, password)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  userService
    .findUserById(id)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

module.exports = passport;
