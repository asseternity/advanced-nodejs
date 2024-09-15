const express = require('express');
const cors = require('cors');
const corsController = require('../controllers/corsController');

const corsRoute = express.Router();

// enable CORS
corsRoute.use(cors());

// Handle pre-flight request for DELETE and other complex requests
corsRoute.options('/posts/:post_id', cors()); // Pre-flight for specific route
corsRoute.options('/posts', cors()); // Pre-flight for all posts route

// routes
corsRoute.delete('/posts/:post_id', corsController.handleDeleteRequest);
corsRoute.get('/posts', corsController.handleGetAllPosts);
corsRoute.get('/posts/:post_id', corsController.handleGetPost);

module.exports = corsRoute; 