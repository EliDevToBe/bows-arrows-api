import express from "express"
export const homeRouter = express.Router();

homeRouter.route("/")
    .get((req, res) => {
        res.redirect("/documentation.html");
        return
    })

homeRouter.route("/api")
    .get((req, res) => {

        res.json({
            brands: req.protocol + "s://" + req.headers.host + "/api/brands",
            arrows: req.protocol + "s://" + req.headers.host + "/api/arrows"
        })
        return
    })