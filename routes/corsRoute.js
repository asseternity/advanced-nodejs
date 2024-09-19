const express = require('express');
const corsController = require('../controllers/corsController');
const corsRoute = express.Router();

// enable CORS
const cors = require('cors');
corsRoute.use(cors());

// Handle pre-flight request for DELETE and other complex requests
corsRoute.options('/users/:user_id', cors()); // Pre-flight for specific route
corsRoute.options('/users', cors()); // Pre-flight for all posts route

// routes
corsRoute.delete('/users/:user_id', corsController.handleDeleteUser);
corsRoute.get('/users', corsController.handleGetAllUsers);
corsRoute.get('/users/:user_id', corsController.handleGetOneUser);
corsRoute.post('/users/', corsController.handlePostUser);

module.exports = corsRoute; 