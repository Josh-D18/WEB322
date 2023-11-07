const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const user = req.cookies.loggedInUser;
  if (user) {
    res.render("bank", { user });
  } else {
    res.redirect("/");
  }
});

router.post("/", (req, res) => {
  const accountNumber = req.body.accountNumber;
  const account = req.body.account;

  if (account === "balance") {
    res.redirect(`/balance/${accountNumber}`);
  } else if (account === "deposit") {
    res.redirect(`/deposit/${accountNumber}`);
  } else if (account === "withdrawal") {
    res.redirect(`/withdrawal/${accountNumber}`);
  }
});

module.exports = router;
