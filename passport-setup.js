const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        callbackURL: 'https://whispering-bayou-52899-2488ba1a59ea.herokuapp.com//auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        done(null, { email: profile.emails[0].value });

    })
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    done(null, { email: email });
});
