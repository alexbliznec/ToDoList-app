const User = require('../models/User');
const passport = require('../libs/passport/index');
const mongoose = require('../libs/mongoose');

const pug = require('pug');
const config = require('config');
const path = require('path');

module.exports = {

    loginPage: async function (ctx) {
        ctx.body = pug.renderFile(path.join(config.get('root.templates'), '/auth.pug'));
    },

    register: async function (ctx) {
        try {
            let candidate = await User.findOne({email: ctx.request.body.email});
            if (candidate) {
                ctx.body = {message: `Пользователь с e-mail ${ctx.request.body.email} уже зарегистрирован.`}
            } else {
                const user = await new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: ctx.request.body.name,
                    email: ctx.request.body.email
                });
                await user.genPasswordHash(ctx.request.body.password);
                await user.save();
                ctx.login(user);
                ctx.redirect('/todolist');
            }
        } catch(err) {console.log(err)};
        
    },

    login: passport.authenticate('local', {successRedirect: '/todolist', failureRedirect: '/loginpage'}),
        
    logout: async function (ctx) {
        ctx.logout();
        ctx.redirect('/loginpage');
    },

    isAuthenticated: async function (ctx, next) {
        if (ctx.isAuthenticated()) {
            return next();
        } else {
            ctx.redirect('/loginpage');
        }
    }

}