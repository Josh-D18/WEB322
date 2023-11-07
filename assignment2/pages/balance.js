const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/:accountNumber", (req, res) => {
  const accountsPath = path.join(__dirname, "../accounts.json");
  const accountsData = fs.readFileSync(accountsPath, "utf8");
  const accounts = JSON.parse(accountsData);

  let accountNumbers = Object.keys(accounts);

  try {
    const accountsPath = path.join(__dirname, "../accounts.json");
    const accountsData = fs.readFileSync(accountsPath, "utf8");
    const accounts = JSON.parse(accountsData);

    accounts.lastID = `${req.params.accountNumber}`;

    fs.writeFile(accountsPath, JSON.stringify(accounts), "utf8", (err) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error!");
      }
    });
  } catch (error) {
    res.sendStatus(400);
  }

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
