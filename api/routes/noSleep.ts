import express from "express";
export const noSleepRouter = express.Router();

require("dotenv").config();

const pg = require("pg");
const connectionString = process.env.DATABASE_URL;
const { Client } = pg;


noSleepRouter.route("/nosleep")
    .all(async (req, res, next) => {

        const client = new Client(connectionString);

        try {
            const noSleep = await client.query("SELECT NOW()");

            res.end();
            return

        } catch (error) {
            res.sendStatus(500);
        }

        await client.end();
    });

async function pleaseDontSleep() {

    setInterval(async () => {
        const response = await fetch("https://bows-arrows-api.vercel.app/nosleep")
    }, 518400000)

}
// pleaseDontSleep();