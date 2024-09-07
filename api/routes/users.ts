import express from "express"
export const usersRouter = express.Router();

usersRouter.route("/register")
    .get((req, res, next) => {
        res.send("ICI html  form page for registration")
    })
    .post((req, res, next) => {
        res.json({
            post: "writes in DB the new user if not already there",
            ifThere: "Send error message or maybe redirect ?",
            else: "Add new user, and redirect to a LOGIN PAGE (todo)",
            infos_needed: {
                username: "username",
                mail: "mail"
            }
        })
    })

usersRouter.route("/login")
    .get((req, res, next) => {



        res.send("ICI html form page for logging in")
    })
    .post((req, res, next) => {
        res.json({
            post: "Check in DB if user exists",
            ifNot: "Send error message or maybe redirect ?",
            else: "Refresh page with now a REDEEM TOKEN button appearing",
            infos_needed: {
                username: "username",
                mail: "mail"
            }
        })
    })