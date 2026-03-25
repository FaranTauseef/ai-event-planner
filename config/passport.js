import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import pool from "../database/database_connection.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        const githubId = profile.id;
        const email = profile.emails?.[0]?.value || null;
        const name = profile.displayName || profile.username;

        let user = await pool.query(
          "SELECT * FROM users WHERE oauth_provider='github' AND oauth_id=$1",
          [githubId]
        );

        if (user.rows.length === 0) {
          const newUser = await pool.query(
            `INSERT INTO users (name,email,oauth_provider,oauth_id)
             VALUES ($1,$2,'github',$3)
             RETURNING *`,
            [name, email, githubId]
          );

          user = newUser;
        }

        return done(null, user.rows[0]);

      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        const googleId = profile.id;
        const email = profile.emails?.[0]?.value || null;
        const name = profile.displayName;

        let user = await pool.query(
          "SELECT * FROM users WHERE oauth_provider='google' AND oauth_id=$1",
          [googleId]
        );

        if (user.rows.length === 0) {

          const newUser = await pool.query(
            `INSERT INTO users (name,email,oauth_provider,oauth_id)
             VALUES ($1,$2,'google',$3)
             RETURNING *`,
            [name, email, googleId]
          );

          user = newUser;
        }

        return done(null, user.rows[0]);

      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;