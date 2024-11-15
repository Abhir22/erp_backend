import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile: Profile, done) => {
      return done(null, profile);  
    }
  )
);
passport.serializeUser((user,done) => done(null,user));
passport.deserializeUser((user: Profile, done) => done(null, user));

export default passport;
