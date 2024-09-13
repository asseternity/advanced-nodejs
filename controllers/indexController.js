const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const getIndex = async (req, res, next) => {
    if (!req.user) {
        return res.render('index', { user: null });
    }
    try {
        const user = await prisma.users.findUnique({
            where: { id: req.user.id },
            include: { users_messages: true },
        });
        res.render('index', { user });
    } catch(err) {
        return next(err);
    }
}

const getIndex2 = (req, res) => {
    res.render('index2');
}

const getLogOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}

const postNewMessage = async (req, res, next) => {
    try {
        await prisma.users_messages.create({
            data: {
                text: req.body.message_text,
                user_id: req.user.id,
            }
        });
        res.redirect('/');
    } catch(err) {
        return next(err)
    }
}

module.exports = { getIndex, getIndex2, getLogOut, postNewMessage }