const LocalStrategy = require('passport-local');
const User = require('../../models/User');


module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function(email, password, done) {
      try {
        const user = await User.findOne({email});
        if (!user) {
          return done(null, false, {message: `нет такого пользователя`});
        }
        let comparedPass = await user.comparePassword(password);
        if (!comparedPass) {
          return done(null, false, {message: `пароль не верен`});
        } else {
          console.log(`////////////////////////////////`);
          console.log(`мы возвращаем юзера ${user.name}`);
          return done(null, user, {message: `добро пожаловать ${user.name}`});
        }

      } catch (err) {console.log(err)};
    }
);