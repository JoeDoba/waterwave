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
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleID: profile.id}).then((existingUser) => {
                if (existingUser) {
                    // We have user record
                    done(null, existingUser);
                } else {
                    // We dont have user record;
                    new User({googleID: profile.id, name: profile.name}).save().then((newUser) => done(null, newUser));
                }
            });
            console.log(profile);
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
        (accessToken, refreshToken, profile, done) => {
            User.findOne({githubID: profile.id}).then((existingUser) => {
                if (existingUser) {
                    // We have user record
                    done(null, existingUser);
                } else {
                    // We dont have user record;
                    new User({githubID: profile.id, name: profile.displayName}).save().then((newUser) => done(null, newUser));
                }
            });
            console.log(profile)
        }
    )
);