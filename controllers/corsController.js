const passport = require('passport');

handleDeleteRequest = async (req, res, next) => {
    res.json({ msg: "Handle delete request!" });
}

handleGetAllPosts = async (req, res, next) => {
    res.json({ msg: "Handle get all posts!" });
}

handleGetPost = async (req, res, next) => {
    res.json({ msg: "Handle get a post!" });
}

module.exports = { handleDeleteRequest, handleGetAllPosts, handleGetPost }