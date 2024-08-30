import express from "express"
export const brandsRouter = express.Router();

require("dotenv").config();

const pg = require("pg");
const connectionString = process.env.DATABASE_URL;
const { Client, Pool } = pg;

// Create pool ready to queries
const pool = new Pool(
    { connectionString }
);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});
// ===== =====

brandsRouter.route("/api/brands")
    .get(async (req, res, next) => {

        const client = await pool.connect();

        try {

            const resultat = await client.query("SELECT brand_id AS id, name, origin, creation_date FROM brands");

            for (const brand of resultat.rows) {

                const arrowsIdArray = await client.query("SELECT arrow_id AS id FROM arrows WHERE brand_id = $1",
                    [brand.id]
                )
                // Changing creation_date
                brand.creationDate = brand.creation_date;
                delete brand.creation_date;

                // Adding all dependant arrows
                const arrowsUrls = arrowsIdArray.rows.map((el) => {
                    const url = req.protocol
                        + "s://"
                        + req.headers.host
                        + "/api/arrows/" + el.id

                    return url;
                });
                brand.arrows = arrowsUrls;

                // adding URL for this brand
                const path = req.path.slice(-1).includes("/") ? req.path : req.path + "/"
                brand.url = req.protocol + "s://"
                    + req.headers.host + path
                    + brand.id;


            }

            res.json(resultat.rows);

        } catch (error) {
            res.sendStatus(500)
        }

        client.release();
        return
    })


brandsRouter.param('id', (req, res, next, value) => {
    if (value == parseInt(value)) {
        next();
    } else {
        res.sendStatus(400);
        return
    }
})

brandsRouter.route("/api/brands/:id")
    .get(async (req, res, next) => {

        const client = await pool.connect();

        try {
            const resultat = await client.query("SELECT brand_id AS id, name, origin, creation_date FROM brands WHERE brand_id = $1",
                [req.params.id]
            );
            const brand = resultat.rows[0];

            // Changing creation_date
            brand.creationDate = brand.creation_date;
            delete brand.creation_date;

            // Adding dependant arrows URL
            const arrowsIdArray = await client.query("SELECT arrow_id AS id FROM arrows WHERE brand_id = $1",
                [brand.id]
            );
            const arrowsUrls = arrowsIdArray.rows.map((el) => {
                const url = req.protocol
                    + "s://"
                    + req.headers.host
                    + "/api/arrows/" + el.id

                return url;
            });
            brand.arrows = arrowsUrls;

            // adding URL for this brand
            const path = req.path.slice(-1).includes("/") ? req.path : req.path + "/"
            brand.url = req.protocol + "s://"
                + req.headers.host + path.slice(0, -1);

            res.json(brand);

        } catch (error) {
            res.sendStatus(500);
        }

        client.release();
        return
    })