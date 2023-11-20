const express = require("express");
const router = express.Router();
const accounts = require("../accounts.json");
const fs = require("fs");
const path = require("path");

router.get("/:accountNumber", (req, res) => {
  let accountNumbers = Object.keys(accounts);
  if (accountNumbers.includes(req.params.accountNumber)) {
    const account = {
      accountBalance: accounts[req.params.accountNumber].accountBalance,
      accountType: accounts[req.params.accountNumber].accountType,
      accountNumber: req.params.accountNumber,
    };
    res.render("withdrawal", account);
  } else {
    console.error("Account does not exist!");
    res.redirect("/bank");
  }
});

router.post("/:accountNumber", (req, res) => {
  const account = accounts[`${req.params.accountNumber}`];
  const withdrawlAmount = req.body.withdrawlAmount;
  console.log(account.accountBalance, withdrawlAmount);

  if (account.accountBalance < withdrawlAmount) {
    let message = "Unable to withdraw that amount. Please deposit more money!";
    res.render("bank", { accounts, message });
  }

  try {
    const accountsPath = path.join(__dirname, "../accounts.json");

    fs.readFile(accountsPath, "utf8", (err, accountsData) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error reading the account details.");
        return;
      }

      const accounts = JSON.parse(accountsData);

      accounts[`${req.params.accountNumber}`].accountBalance -= withdrawlAmount;
      accounts.lastID = `${req.params.accountNumber}`;

      fs.writeFile(accountsPath, JSON.stringify(accounts), "utf8", (err) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error saving the account details.");
        } else {
          res.redirect("/bank");
        }
      });
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
