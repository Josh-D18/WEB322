const express = require("express");
const router = express.Router();
const Client = require("../database/client");

router.get("/:accountNumber", async (req, res) => {
  const user = req.cookies.loggedInUser;

  try {
    const userAccount = await Client.findOne({ username: user.username });
    if (userAccount) {
      if (userAccount.chequingAccountNumber === req.params.accountNumber) {
        const account = {
          accountBalance: userAccount.chequingAccountBalance,
          accountType: "Chequing",
          accountNumber: req.params.accountNumber,
        };
        res.render("balance", { account, user });
      } else if (
        userAccount.savingsAccountNumber === req.params.accountNumber
      ) {
        const account = {
          accountBalance: userAccount.savingsAccountBalance,
          accountType: "Savings",
          accountNumber: req.params.accountNumber,
        };
        res.render("balance", { account, user });
      }
    }
  } catch (error) {
    console.error("Account does not exist!");
    res.redirect("/bank");
  }
});

module.exports = router;
