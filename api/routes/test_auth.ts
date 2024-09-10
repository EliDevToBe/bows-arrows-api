import express from "express"
export const AuthRouter = express.Router();
import { generateToken } from "../utils/tokenJwt"
import { onlyGetMethodAllowed } from "../utils/onlyGet";
import { createClient } from "@supabase/supabase-js";
import path from 'path'

require("dotenv").config();
const projectUrl = process.env.DATABASE_URLPROJECT || "https://ciuagcwxnovsykrphowu.supabase.co/";
const anon = process.env.DATABASE_ANON || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdWFnY3d4bm92c3lrcnBob3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MTcyNjYsImV4cCI6MjAzODA5MzI2Nn0.ymcCKi2_Ca3ihegRdjcXacBCztzxmfXrtbU4WxBRy54";

// AuthRouter.use(express.json());
AuthRouter.use(express.urlencoded({ extended: true }));

AuthRouter.route("/newuser")
    .post((req, res, next) => {

        // const username = req.body.username

        // console.log(req.body);
        console.log(req.body);

        // res.redirect("/");
        const options = {
            root: path.join(__dirname + "/../public"),
            maxAge: 1000 * 60 * 1
        }

        res.sendFile("index.html", options);
    })
// .all(onlyGetMethodAllowed());

// AuthRouter.route("/usertest")
//     .get(async (req, res, next) => {

//         const supabase = createClient(projectUrl, anon)

//         const { data, error } = await supabase.auth.signUp({
//             email: 'example@email.com',
//             password: 'example-password',
//         });

//         res.json(data);
//     })
