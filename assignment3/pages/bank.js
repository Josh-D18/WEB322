const express = require("express");
const router = express.Router();
const Client = require("../database/client");

router.get("/", async (req, res) => {
  const user = req.cookies.loggedInUser;
  const accounts = {
    chequingAccountNumber: "",
    savingsAccountNumber: "",
  };

  console.log(user, "bank");
  try {
    const userAccount = await Client.findOne({ username: user.username });
    if (userAccount.chequingAccountNumber) {
      accounts.chequingAccountNumber = userAccount.chequingAccountNumber;
    }

    if (userAccount.savingsAccountNumber) {
      accounts.savingsAccountNumber = userAccount.savingsAccountNumber;
    }

    if (user) {
      res.render("bank", { user, accounts });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  const accountNumber = req.body.accountNumber;
  const account = req.body.account;
  const user = req.cookies.loggedInUser;
  let message = "";

  try {
    const userAccount = await Client.findOne({ username: user.username });

    if (
      userAccount &&
      (userAccount.chequingAccountNumber === accountNumber ||
        userAccount.savingsAccountNumber === accountNumber)
    ) {
      if (account === "balance") {
        res.redirect(`/balance/${accountNumber}`);
      } else if (account === "deposit") {
        res.redirect(`/deposit/${accountNumber}`);
      } else if (account === "withdrawal") {
        res.redirect(`/withdrawal/${accountNumber}`);
      }
    } else {
      message = "Account Does Not Exist!";
      res.render("bank", { account, message, user });
    }
  } catch (error) {
    console.error("Error parsing accounts data:", error);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
