const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const user = req.cookies.loggedInUser;
    if (user) {
        res.render('bank', {user});
    } else{
        res.redirect("/");
    }
});

//Delete Route

// router.delete("/delete", (_, res) => {
//     res.clearCookie('loggedInUser')
//     res.redirect("/login");
// })



module.exports = router;