const passport = require('passport');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

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
    console.log(`received data: username: ${req.body.username}, password: ${req.body.password}!`);
    console.log(`Req.body:`);
    console.log(req.body);
    try {
        const sameNameUser = await prisma.users.findFirst({
            where: {
                username: req.body.username
            }
        });
        if (!sameNameUser) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await prisma.users.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword
                }
            });
            res.json({ msg: `User successfully created! Username: ${req.body.username}, password: ${hashedPassword}!` });
        } else {
            res.json({ msg: "Username already exists!" });
        }
    } catch(err) {
        next(err);
    }
}

module.exports = { handleDeleteUser, handleGetAllUsers, handleGetOneUser, handlePostUser }