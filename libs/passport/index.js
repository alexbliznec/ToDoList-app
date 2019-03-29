const passport = require('koa-passport');


const User = require('../../models/User');
const localStrategy = require('./localStrategy');
passport.use(localStrategy);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, done);
});

module.exports = passport;