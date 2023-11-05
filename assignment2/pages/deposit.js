const express = require("express");
const router = express.Router();
const accounts = require("../accounts.json");
const fs = require("fs");

router.get("/:accountNumber", (req, res) => {
  let accountNumbers = Object.keys(accounts);

  if (accountNumbers.includes(req.params.accountNumber)) {
    const account = {
      accountBalance: accounts[req.params.accountNumber].accountBalance,
      accountType: accounts[req.params.accountNumber].accountType,
      accountNumber: req.params.accountNumber,
    };
    res.render("deposit", { account });
  } else {
    res.send("/bank").status(400);
  }
});

router.post("/:accountNumber", (req, res) => {
  const account = accounts[`${req.params.accountNumber}`];
  const depositAmount = req.body.depositAmount;

  fs.writeFile("../accounts.json", JSON.stringify(accounts), "utf8", (err) => {
    if (err) {
      console.log(err);
      res.status(400).send("Error saving the account details.");
    } else {
      accounts[`${req.params.accountNumber}`].accountBalance =
        account.accountBalance + Number(depositAmount);
      console.log(accounts, account, depositAmount);
    }
    res.redirect("/bank");
  });
});

module.exports = router;
