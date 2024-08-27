import express from "express"
export const homeRouter = express.Router();

homeRouter.route("/")
    .get((req, res) => {
        res.send("TO DO PAGE DE DOCU")
    })
