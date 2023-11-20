const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Client = require("../database/client");
const BankAccount = require("../database/bankaccount");

router.get("/", async (req, res) => {
  const user = req.cookies.loggedInUser;

  try {
    const account = await Client.findOne({ username: user.username });
    const chequingAccount = account.chequingAccountNumber;
    const savingsAccount = account.savingsAccountNumber;

    if (user) {
      if (chequingAccount && savingsAccount) {
        let message = "You already have 2 accounts!";
        res.render("bank", { message, user });
      } else {
        res.render("openAccount", user);
      }
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  const user = req.cookies.loggedInUser;
  try {
    if (user) {
      const account = await Client.findOne({ username: user.username });
      const chequingAccount = account.chequingAccountNumber;
      const savingsAccount = account.savingsAccountNumber;
      const accountType = req.body.accountType;
      let message = "";

      if (chequingAccount && savingsAccount) {
        message = "You already have 2 accounts!";
        res.render("bank", { message, user });
      } else {
        if (chequingAccount && accountType === "Chequing") {
          message = "You already have a Chequing Account!";
          res.render("bank", { message, user });
        } else if (savingsAccount && accountType === "Savings") {
          message = "You already have a Savings Account!";
          res.render("bank", { message, user });
        } else {
          const accountNumber = "00000" + Math.floor(Math.random() * 5000) + 1;
          let updateField;

          if (accountType === "Chequing") {
            updateField = { chequingAccountNumber: accountNumber };
          } else if (accountType === "Savings") {
            updateField = { savingsAccountNumber: accountNumber };
          }

          await Client.findOneAndUpdate(
            { username: user.username },
            updateField,
            { new: true }
          );

          message = `${accountType} Account #${accountNumber} Created`;
          res.render("bank", { message, user });
        }
      }
    } else {
      res.redirect("/");
    }
  } catch (error) {
    message = "Sorry, we cannot open an account!";
    res.render("bank", { message, user });
  }
});

module.exports = router;
