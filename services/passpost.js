const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, 
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const existingUser = await User.findOne({googleID: profile.id});
            if (existingUser) {
                // We have user record
                done(null, existingUser);
            } else {
                // We dont have user record;
                const newUser = await new User({googleID: profile.id, name: profile.displayName}).save();
                done(null, newUser);
            }
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: keys.githubClientID,
            clientSecret: keys.githubClientSecret,
            callbackURL: "/auth/github/callback",
        }, 
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const existingUser = await User.findOne({githubID: profile.id});
            if (existingUser) {
                // We have user record
                done(null, existingUser);
            } else {
                // We dont have user record;
                const newUser = await new User({githubID: profile.id, name: profile.displayName}).save();
                done(null, newUser);
            }
        }
    )
);