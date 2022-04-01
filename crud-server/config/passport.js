const passport = require("passport");
const { signupWithGoogle } = require("../controllers/authController");
const Googlestrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/userModel");

const GOOGLE_CALLBACK_URL = "http://localhost:3001/api/v1/auth/google/callback";

passport.use(
  new Googlestrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        googleId: profile.id,
      };
      try {
        const user = await signupWithGoogle(defaultUser);
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  if (user) cb(null, user);
  //error handle
});
