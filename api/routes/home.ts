const express = require("express");
const routerHome = express.Router();

routerHome.route("/home")
    .get((req, res) => {
        res.send("YAY")
    })

module.exports = routerHome