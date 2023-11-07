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
    res.render("deposit", { account });
  } else {
    console.error("Account does not exist!");
    res.redirect("/bank");
  }
});

router.post("/:accountNumber", (req, res) => {
  const account = accounts[`${req.params.accountNumber}`];
  const depositAmount = req.body.depositAmount;
  try {
    const accountsPath = path.join(__dirname, "../accounts.json");
    const accountsData = fs.readFileSync(accountsPath, "utf8");
    const accounts = JSON.parse(accountsData);

    accounts[`${req.params.accountNumber}`].accountBalance =
      Number(account.accountBalance) + Number(depositAmount);

    accounts.lastID = `${req.params.accountNumber}`;

    fs.writeFile(accountsPath, JSON.stringify(accounts), "utf8", (err) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error saving the account details.");
      } else {
        res.redirect("/bank");
      }
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
