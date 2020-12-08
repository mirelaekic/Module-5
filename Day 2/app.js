const express = require("express");

const app = express();

// ROUTES

app.get("/", (req, res) => {
    res.send("home")
});

app.listen(3001)