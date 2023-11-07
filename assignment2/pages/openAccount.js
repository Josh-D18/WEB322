const express = require("express");
const router = express.Router();
const accounts = require("../accounts.json");
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  res.render("openAccount");
});

router.post("/", (req, res) => {
  const accountType = req.body.accountType;
  try {
    const accountsPath = path.join(__dirname, "../accounts.json");
    const accountsData = fs.readFileSync(accountsPath, "utf8");
    const accounts = JSON.parse(accountsData);
    let lastID = "";

    if (Number(accounts.lastID) < 10) {
      lastID = Number(accounts.lastID) + 1;
      lastID = "000000" + lastID;
    } else {
      lastID = Number(accounts.lastID) + 1;
      lastID = "00000" + lastID;
    }

    accounts.lastID = `${req.params.accountNumber}`;
    const message = `${accountType} Account #${lastID} Created`;

    accounts[lastID] = {
      accountType: accountType,
      accountBalance: 0,
    };

    fs.writeFileSync(accountsPath, JSON.stringify(accounts, null, 2), "utf8");

    res.render("bank", { accounts, message });
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating account.");
  }
});

module.exports = router;
