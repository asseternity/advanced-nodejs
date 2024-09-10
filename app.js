// imports
const bcrypt = require('bcryptjs');
const express = require('express');
const path = require('node:path'); 
const pool = require('./db/pool');
const app = express();
const indexRoute = require('./routes/indexRoute')
const signUpRoute = require('./routes/signUpRoute');

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// ***authentication with passport.js (and its dependency express-session)
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());

// ***function that sets up LocalStrategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM USERS WHERE username = $1", [username]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

// local vars
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });  

// ***serialize and deserialize user for session cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];
        done(null, user);
    } catch(err) {
        done(err);
    }
});

// mount
app.use('/', indexRoute);
app.use('/sign-up', signUpRoute);

// launch
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
});