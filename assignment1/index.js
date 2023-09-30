const express = require('express');
const app = express();
const PORT = 3000;
const login = require("./pages/login");
const bank = require("./pages/bank");


app.use("/login", login);
app.use("/bank", bank);

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})