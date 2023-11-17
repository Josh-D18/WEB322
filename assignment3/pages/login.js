const express = require('express');
const router = express.Router()
const users = require("../user.json");



router.get("/", (_, res) => {
    res.render('index', users);
});

router.post("/", (req, res) => {
    const {username, password} = req.body;
    if (username === "") {
        res.status(400).render('index', { errorUsername: "Error! Please enter a username!" });
    } else if (password === "") {
        res.status(400).render('index', { errorPassword: "Error! Please enter a password!" });
    } else if (!users.hasOwnProperty(username)) {
        res.status(400).render('index', { errorUsername: "Not a registered username" });
    } else if (users[username] !== password) {
        res.status(400).render('index', { errorPassword: "Incorrect Password" });
    } else {
        res.cookie("loggedInUser", {username})
        res.redirect("/bank")
    }
})

module.exports = router;