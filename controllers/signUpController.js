const pool = require('../db/pool');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const getIndex = (req, res) => {
    res.render('sign-up-form');
}

const postIndex = async (req, res, next) => {
    try {
        // hash the password
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                return next(err);
            }
            // Insert hashed pw into database
            // await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
            //     req.body.username,
            //     hashedPassword,
            // ]);
            // Insert hashed pw into DB using Prisma ORM
            await prisma.users.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword,
                }
            });
            res.redirect('/');
        });
    } catch(err) {
        return next(err)
    } 
}

module.exports = { getIndex, postIndex }