const express = require('express');
const passport = require('passport');
const indexController = require('../controllers/indexController')

const indexRoute = express.Router();

indexRoute.get('/', indexController.getIndex);
indexRoute.get('/index2', indexController.getIndex2);
indexRoute.get('/log-out', indexController.getLogOut);
indexRoute.post('/new-message', indexController.postNewMessage);

// ***this does everything on its own
indexRoute.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );

module.exports = indexRoute;