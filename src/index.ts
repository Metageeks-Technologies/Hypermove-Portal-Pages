import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import { Strategy as TwitterStrategy, Profile } from 'passport-twitter';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(session({
  secret: 'thisissecretkey', 
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY!,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
  callbackURL: "http://localhost:8000/auth/twitter/callback"
}, (token, tokenSecret, profile, done) => {
  const username = (profile as Profile).username;
  console.log("Sucess authentication Twitter username:", username);

  return done(null, username); 
}));

passport.serializeUser((username, done) => {
  done(null, username);
});

passport.deserializeUser((username:string, done) => {
  done(null, username);
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: 'http://localhost:3000/setting', failureRedirect: 'http://localhost:3000' })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript server');
});

app.get('/greet', (req: Request, res: Response) => {
  const username = req.user as string; 
  res.send(`Welcome, ${username}!`);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
