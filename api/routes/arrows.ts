import express from "express"
export const arrowsRouter = express.Router();

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

arrowsRouter.route('/api/arrows')
    .get(async (req, res) => {

        const client = await pool.connect();

        try {
            const resultat = await client.query("SELECT arrows.arrow_id AS id, arrows.name AS name, brands.name AS brand, brands.brand_id AS brandid, discipline, material, material_quality AS quality, gpi_tolerance, straightness_tolerance, spine_tolerance FROM arrows  LEFT JOIN brands ON arrows.brand_id = brands.brand_id")

            const path = req.path.slice(-1).includes("/") ? req.path : req.path + "/";

            for (const arrow of resultat.rows) {

                // Grouping material fields
                arrow.material = {
                    name: arrow.material,
                    quality: arrow.quality
                }
                delete arrow.quality;

                // Adding brand URL
                const brandUrl = req.protocol
                    + "s://" + req.headers.host
                    + "/brands/" + arrow.brandid;
                arrow.brand = {
                    name: arrow.brand,
                    url: brandUrl
                };
                delete arrow.brandid

                // Grouping all tolerances
                const tolerances = {
                    gpi: arrow.gpi_tolerance,
                    straightness: arrow.straightness_tolerance,
                    spine: arrow.spine_tolerance
                };
                arrow.tolerances = tolerances;
                delete arrow.gpi_tolerance;
                delete arrow.straightness_tolerance;
                delete arrow.spine_tolerance;

                // Adding spine URL
                const spineUrl = req.protocol
                    + "s://"
                    + req.headers.host
                    + path
                    + arrow.id
                    + "/spines";

                arrow.spinesUrl = spineUrl;
            }

            // Final response
            res.json(resultat.rows);

        } catch (error) {
            res.sendStatus(500);
        }

        client.release();
        return
    })

// CODE TO VALIDATE ID PARAM
arrowsRouter.param('id', (req, res, next, value) => {
    if (value == parseInt(value)) {
        next();
    } else {
        res.sendStatus(400);
        return
    }
})

arrowsRouter.route("/api/arrows/:id")
    .get(async (req, res) => {

        const client = await pool.connect();

        try {
            const id = parseInt(req.params.id);

            const resultat = await client.query(
                "SELECT arrows.arrow_id AS id, arrows.name AS name, brands.brand_id AS brandid, brands.name AS brand, discipline, material, material_quality AS quality, gpi_tolerance, straightness_tolerance, spine_tolerance FROM arrows LEFT JOIN brands ON arrows.brand_id = brands.brand_id WHERE arrows.arrow_id = $1"
                , [id]);

            const arrow = resultat.rows[0];

            // Grouping material fields
            arrow.material = {
                name: arrow.material,
                quality: arrow.quality
            }
            delete arrow.quality;

            // Adding brand URL
            const brandUrl = req.protocol
                + "s://" + req.headers.host
                + "/api/brands/" + arrow.brandid;
            arrow.brand = {
                name: arrow.brand,
                url: brandUrl
            };
            delete arrow.brandid;

            // Grouping all tolerances
            const tolerances = {
                gpi: arrow.gpi_tolerance,
                straightness: arrow.straightness_tolerance,
                spine: arrow.spine_tolerance
            };
            arrow.tolerances = tolerances;
            delete arrow.gpi_tolerance;
            delete arrow.straightness_tolerance;
            delete arrow.spine_tolerance;

            // Adding spine URL
            const path = req.path.slice(-1).includes("/") ? req.path.slice(0, -1) : req.path;
            const spineUrl = req.protocol + "s://" + req.headers.host + path + "/spines";
            arrow.spinesUrl = spineUrl;

            // TEST CACHING


            // Final response
            res.json(arrow);
            // console.log(res)
        } catch (error) {
            res.sendStatus(500);
        }

        client.release();
        return
    })

arrowsRouter.route("/api/arrows/:id/spines")
    .get(async (req, res) => {
        const client = await pool.connect();

        try {
            const arrowId = parseInt(req.params.id);

            const spinesArray = await client.query("SELECT variant_id AS id, spine, inner_diam AS inner_diameter, outer_diam AS outer_diameter, length, gpi, points FROM variants WHERE arrow_id = $1",
                [arrowId]
            );

            // Retrieve arrow name and include URL
            const arrow = await client.query("SELECT name FROM arrows WHERE arrow_id = $1",
                [arrowId]
            );

            const path = req.path.slice(0, -"spines".length - 1);
            const arrowUrl = req.protocol + "s://" + req.headers.host + path;
            const response = {
                arrow: { name: arrow.rows[0].name, url: arrowUrl },
                spines: spinesArray.rows
            }
            res.json(response);

        } catch (error) {
            res.sendStatus(500);
        }

        client.release();
        return
    })
