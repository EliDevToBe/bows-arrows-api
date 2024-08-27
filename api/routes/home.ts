import express from "express"
export const homeRouter = express.Router();

homeRouter.route("/")
    .all((req, res) => {
        res.redirect("/documentation.html");
    })

homeRouter.route("/api")
    .all((req, res) => {
        res.json({
            brands: req.protocol + "://" + req.headers.host + "/api/brands",
            arrows: req.protocol + "://" + req.headers.host + "/api/arrows"
        })
    })