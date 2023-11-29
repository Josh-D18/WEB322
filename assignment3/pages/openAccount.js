const express = require("express");
const router = express.Router();
const Client = require("../database/client");

router.get("/", async (req, res) => {
  const user = req.cookies.loggedInUser;
  try {
    const accounts = await Client.findOne({ username: user.username });
    const chequingAccount = accounts.chequingAccountNumber;
    const savingsAccount = accounts.savingsAccountNumber;

    if (user) {
      res.render("openAccount", { user });
    } else {
      res.redirect("/bank");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/bank");
  }
});

router.post("/", async (req, res) => {
  const user = req.cookies.loggedInUser;
  try {
    if (user) {
      const accounts = await Client.findOne({ username: user.username });
      const chequingAccount = accounts.chequingAccountNumber;
      const savingsAccount = accounts.savingsAccountNumber;
      const accountType = req.body.accountType;
      let message = "";

      if (chequingAccount && savingsAccount) {
        message = "You already have 2 accounts!";
        res.render("openAccount", { message, user });
      } else {
        if (chequingAccount && accountType === "Chequing") {
          message = "You already have a Chequing Account!";
          res.render("openAccount", { message, user });
        } else if (savingsAccount && accountType === "Savings") {
          message = "You already have a Savings Account!";
          res.render("openAccount", { message, user });
        } else {
          const accountNumber = "00000" + Math.floor(Math.random() * 5000) + 1;
          let updateField;

          if (accountType === "Chequing") {
            updateField = {
              chequingAccountNumber: accountNumber,
              chequingAccountBalance: 0,
            };
          } else if (accountType === "Savings") {
            updateField = {
              savingsAccountNumber: accountNumber,
              savingsAccountBalance: 0,
            };
          }

          await Client.findOneAndUpdate(
            { username: user.username },
            updateField,
            { new: true }
          );

          message = `${accountType} Account #${accountNumber} Created`;
          res.render("openAccount", { message, user });
        }
      }
    } else {
      res.redirect("/");
    }
  } catch (error) {
    message = "Sorry, we cannot open an account!";
    res.render("openAccount", { message, user });
  }
});

module.exports = router;
