import express from "express"
import path from "path";
export const homeRouter = express.Router();
import { myCache } from "..";

homeRouter.route("/")
    .get((req, res) => {
        // pas de redirection mais en mode Render
        // finalement pas de render car pas d'engine

        const options = {
            root: path.join(__dirname + "/../public"),
            maxAge: 1000 * 60 * 1
        }

        res.sendFile("documentation.html", options);
        return
    })

homeRouter.route("/api")
    .get((req, res) => {

        const response = {
            brands: req.protocol + "s://" + req.headers.host + "/api/brands",
            arrows: req.protocol + "s://" + req.headers.host + "/api/arrows"
        };

        myCache.set(req.originalUrl, response);
        console.log("caching")

        res.json(response);
        return
    })