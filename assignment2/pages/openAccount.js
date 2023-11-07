const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  const user = req.cookies.loggedInUser;
  console.log(user);
  if (user) {
    res.render("openAccount", user);
  } else {
    res.redirect("/");
  }
});

router.post("/", (req, res) => {
  const user = req.cookies.loggedInUser;

  if (user) {
    const accountType = req.body.accountType;
    try {
      const accountsPath = path.join(__dirname, "../accounts.json");
      const accountsData = fs.readFileSync(accountsPath, "utf8");
      const accounts = JSON.parse(accountsData);
      let lastID = "";

      if (Number(accounts.lastID) < 10) {
        lastID = Number(accounts.lastID) + 1;
        lastID = "000000" + lastID;
      } else {
        lastID = Number(accounts.lastID) + 1;
        lastID = "00000" + lastID;
      }

      accounts.lastID = lastID;
      const message = `${accountType} Account #${lastID} Created`;

      accounts[lastID] = {
        accountType: accountType,
        accountBalance: 0,
      };

      fs.writeFileSync(accountsPath, JSON.stringify(accounts, null, 2), "utf8");

      res.render("bank", { accounts, message, user });
    } catch (error) {
      res.status(400).send("Error creating account.");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
