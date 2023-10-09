const express = require('express');
const router = express.Router()

router.get("/", (req, res) => {
    const user = req;
    console.log(user);
    res.send('GET request to the homepage');
});



module.exports = router;