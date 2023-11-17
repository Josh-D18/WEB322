const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

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
  const user = req.cookies.loggedInUser;
  let message = "";

  try {
    const accountsPath = path.join(__dirname, "../accounts.json");
    const accountsData = fs.readFileSync(accountsPath, "utf8");
    const accounts = JSON.parse(accountsData);
    let accountNumbers = Object.keys(accounts);

    if (accountNumbers.includes(accountNumber)) {
      if (account === "balance") {
        res.redirect(`/balance/${accountNumber}`);
      } else if (account === "deposit") {
        res.redirect(`/deposit/${accountNumber}`);
      } else if (account === "withdrawal") {
        res.redirect(`/withdrawal/${accountNumber}`);
      }
    } else {
      message = "Account Does Not Exist!";
      res.render("bank", { accounts, message, user });
    }
  } catch (error) {
    res.status(500).send("Error parsing accounts data.");
  }
});

module.exports = router;
