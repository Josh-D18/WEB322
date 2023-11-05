const express = require("express");
const router = express.Router();
const accounts = require("../accounts.json");

router.get("/:accountNumber", (req, res) => {
  let accountNumbers = Object.keys(accounts);

  if (accountNumbers.includes(req.params.accountNumber)) {
    const account = {
      accountBalance: accounts[req.params.accountNumber].accountBalance,
      accountType: accounts[req.params.accountNumber].accountType,
      accountNumber: req.params.accountNumber,
    };
    res.render("balance", { account });
  } else {
    console.error("Account does not exist!");
    res.redirect("/bank");
  }
});

module.exports = router;
