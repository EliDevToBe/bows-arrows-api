require("dotenv").config();
import express from "express"
export const AuthRouter = express.Router();
import { generateToken } from "../utils/tokenJwt"
import { onlyGetMethodAllowed } from "../utils/onlyGet";
import validator from 'validator';
import * as argon2 from 'argon2';
import { createClient } from '@supabase/supabase-js';

const supabase_url = process.env.DATABASE_URLPROJECT!;
const anon_key = process.env.DATABASE_ANON!;

const supabase = createClient(supabase_url, anon_key, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})

AuthRouter.use(express.json());
AuthRouter.use(express.urlencoded({ extended: true }));

const argonOptions = {
    secret: Buffer.from(process.env.ARGON_PEPPER!),
    timeCost: 4
}


AuthRouter.route("/newuser")
    .post(async (req, res, next) => {

        // if (req.headers.authorization) {
        //     console.log(req.headers.authorization)
        // } else {
        //     res.end("non");
        //     return
        // }

        if (req.body) {

            const username: string = req.body.username.trim();
            const email = validator.isEmail(req.body.email.trim()) ? req.body.email.trim() : null;

            // Manual crypting
            // const password = await argon2.hash(
            //     req.body.password.trim(),
            //     argonOptions
            // );
            const password = req.body.password?.trim()

            if (!password || !email) {
                res.sendStatus(400);
                return
            }

            try {
                //Creating Auth User supabase
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        data: {
                            display_name: username
                        }
                    }
                })

                if (error) {
                    res.sendStatus(400)
                    return
                } else {
                    res.set("Authorization", data.session!.access_token)
                    res.end();
                }

                // res.sendStatus(200);
                return

            } catch (error) {
                console.log(error)
                res.sendStatus(500);
                return
            }

        } else {
            res.sendStatus(400);
            return
        }

        // res.redirect("/");
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
