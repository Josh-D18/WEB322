const express = require("express");
const router = express.Router();

router.get("/:accountNumber", (req, res) => {
  res.render("withdrawal");
});

module.exports = router;
