import express from "express"
export const AuthRouter = express.Router();
import { generateToken } from "../utils/auth";
import { onlyGetMethodAllowed } from "../utils/onlyGet";

AuthRouter.route("/testauth")
    .get((req, res, next) => {


        const token = generateToken({ testing: "Test user" })
        res.json({ ok: token })
        // res.send("form create a user account to redeem API key");
        return
    })
    .post((req, res, next) => {


        // console.log(req.headers.authorization)


        if (req.headers.authorization === "ouioui") {
            res.json({ POST: "C'est posté !!! clap clap" })
        }
    })
    .all(onlyGetMethodAllowed());