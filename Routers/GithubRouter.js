const express = require('express');
const GithubRouter = express.Router();
const githubData = require("../Controllers/GithubController");

GithubRouter.get('/', async (req, res)=>{
    try {
        const languagesList = await githubData();
        res.statusCode = 200;
        res.send(languagesList);
    } catch (error) {
        res.statusCode = 422;
        res.send({ success: false });
    }
});

module.exports = GithubRouter;