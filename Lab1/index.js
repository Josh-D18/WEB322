const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("SUCCESS!");
});

app.get("/echo", (req, res) => {
    res.send("SUCCESS! echo");
});

app.get("/foxtrot/:kilo", (req, res) => {
    res.send(`SUCCESS! Received ${req.params.kilo} via foxtrot`);
});

app.get("/*", (req, res) => {
    res.send("FAILED! Fix your URL");
});

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

