const passport = require('passport');

const getIndex = (req, res) => {
    res.render('index', { user: req.user });
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


module.exports = { getIndex, getIndex2, getLogOut }