const express = require("express")

const router = express.Router();

router.route("/home")
    .get((req, res) => {
        res.send("YAY")
    })

module.exports = router