const express = require("express");
const router = express.Router();
const accounts = require("../accounts.json");
const fs = require("fs");

router.get("/", (req, res) => {
  res.render("openAccount");
});

router.post("/", (req, res) => {
  const accountType = req.body.accountType;
  const lastID = accounts.lastID;

  try {
    fs.writeFileSync("../accounts.json", JSON.stringify(accounts), (err) => {
      if (err) {
      } else {
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

module.exports = router;
