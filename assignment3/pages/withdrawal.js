const express = require("express");
const router = express.Router();
const Client = require("../database/client");

router.get("/:accountNumber", async (req, res) => {
  const user = req.cookies.loggedInUser;
  const userAccount = await Client.findOne({ username: user.username });
  if (userAccount) {
    if (userAccount.chequingAccountNumber === req.params.accountNumber) {
      const account = {
        accountBalance: userAccount.chequingAccountBalance,
        accountType: "Chequing",
        accountNumber: req.params.accountNumber,
      };
      res.render("withdrawal", { account, user });
    } else if (userAccount.savingsAccountNumber === req.params.accountNumber) {
      const account = {
        accountBalance: userAccount.savingsAccountBalance,
        accountType: "Savings",
        accountNumber: req.params.accountNumber,
      };
      res.render("withdrawal", { account, user });
    }
  } else {
    console.error("Account does not exist!");
    res.redirect("/bank");
  }
});

router.post("/:accountNumber", async (req, res) => {
  const user = req.cookies.loggedInUser;
  const withdrawalAmount = req.body.withdrawlAmount;
  try {
    const userAccount = await Client.findOne({ username: user.username });

    if (userAccount.chequingAccountNumber === req.params.accountNumber) {
      if (userAccount.chequingAccountBalance < withdrawalAmount) {
        let message =
          "Unable to withdraw that amount. Please deposit more money!";
        res.render("bank", { accounts, message });
      } else {
        await Client.findOneAndUpdate(
          { username: user.username },
          { $inc: { chequingAccountBalance: -withdrawalAmount } }
        );
        res.redirect("/bank");
      }
    } else if (userAccount.savingsAccountNumber === req.params.accountNumber) {
      if (userAccount.savingsAccountBalance < withdrawalAmount) {
        let message =
          "Unable to withdraw that amount. Please deposit more money!";
        res.render("bank", { accounts, message });
      } else {
        await Client.findOneAndUpdate(
          { username: user.username },
          { $inc: { savingsAccountBalance: -withdrawalAmount } }
        );
        res.redirect("/bank");
      }
    } else {
      res.status(404).send("Account not found");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
