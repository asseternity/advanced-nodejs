const express = require('express');
const signUpController = require('../controllers/signUpController')

const signUpRoute = express.Router();

signUpRoute.get('/', signUpController.getIndex);
signUpRoute.post('/', signUpController.postIndex);

module.exports = signUpRoute;