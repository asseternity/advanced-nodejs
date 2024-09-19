const passport = require('passport');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

handleDeleteUser = async (req, res, next) => {
    try {
        const ourUser = await prisma.users.findUnique({
            where: {
                id: parseInt(req.params.user_id)
            }
        });
        if (ourUser) {
            res.send(ourUser);
        } else {
            res.json({ msg: "Handle delete request for user id: user not found!"})
        }    
    } catch(err) {
        next(err);
    }
}

handleGetAllUsers = async (req, res, next) => {
    const allUsers = await prisma.users.findMany();
    res.send(allUsers);
}

handleGetOneUser = async (req, res, next) => {
    try {
        const ourUser = await prisma.users.findUnique({
            where: {
                id: parseInt(req.params.user_id)
        }
        });
        if (ourUser) {
            res.send(ourUser);
        } else {
            res.json({ msg: "Handle get request for user id: user not found!"})
        }
    } catch(err) {
        next(err);
    }
}

handlePostUser = async (req, res, next) => {
    try {
        const sameNameUser = await prisma.users.findFirst({
            where: {
                username: req.body.username
            }
        });
        if (!sameNameUser) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const createdUser = await prisma.users.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword
                }
            });

            // // API security
            // jwt.sign({user: createdUser}, 'secretkey', (err, token) => {
            //     res.json({
            //         token: token
            //     });
            // });

            res.json({ msg: `User successfully created! Username: ${req.body.username}, password: ${hashedPassword}!` });
        } else {
            res.json({ msg: "Username already exists!" });
        }
    } catch(err) {
        next(err);
    }
}

// Format of token is Authorization: Bearer <access_token>

// Verify token
verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== undefined) {
        // Split at the space to filter out the word 'bearer
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = { handleDeleteUser, handleGetAllUsers, handleGetOneUser, handlePostUser, verifyToken }