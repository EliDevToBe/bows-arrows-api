import express from "express"
export const homeRouter = express.Router();

homeRouter.route("/home")
    .get((req, res) => {
        res.send("YAY")
    })
