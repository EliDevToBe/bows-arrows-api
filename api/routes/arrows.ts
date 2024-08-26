const express = require("express")
let routerArrows = express.Router();

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

routerArrows.route('/arrows')
    .get(async (req, res) => {

        const client = await pool.connect();

        try {
            const resultat = await client.query("SELECT arrows.arrow_id AS id, arrows.name AS model, brands.name AS brand, brands.brand_id AS brandid, discipline, material, material_quality AS quality, gpi_tolerance, straightness_tolerance, spine_tolerance FROM arrows  LEFT JOIN brands ON arrows.brand_id = brands.brand_id")

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
                    + "://" + req.headers.host
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
                    + "://"
                    + req.headers.host
                    + path
                    + arrow.id
                    + "/spines";

                arrow.spines = { url: spineUrl }
            }

            // Final response
            res.json(resultat.rows);

        } catch (error) {
            res.sendStatus(500);
        }
        client.release();
    })

// CODE TO VALIDATE ID PARAM
routerArrows.param('id', (req, res, next, value) => {
    if (value == parseInt(value)) {
        next();
    } else {
        res.sendStatus(400).send();
    }
})

routerArrows.route("/arrows/:id")
    // .all((req, res, next) => {
    //     res.set('Cache-Control', 'public, max-age=3600');
    //     next();
    // })
    .get(async (req, res) => {

        const client = await pool.connect();

        try {
            const id = parseInt(req.params.id);

            const resultat = await client.query(
                "SELECT arrows.arrow_id AS id, arrows.name AS model, brands.brand_id AS brandid, brands.name AS brand, discipline, material, material_quality AS quality, gpi_tolerance, straightness_tolerance, spine_tolerance FROM arrows LEFT JOIN brands ON arrows.brand_id = brands.brand_id WHERE arrows.arrow_id = $1"
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
                + "://" + req.headers.host
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
            const path = req.path.slice(-1).includes("/") ? req.path.slice(0, -1) : req.path;
            const spineUrl = req.protocol + "://" + req.headers.host + path + "/spines";
            arrow.spines = { url: spineUrl };

            // TEST CACHING


            // Final response
            res.json(arrow);
            // console.log(res)
        } catch (error) {
            res.sendStatus(500).send(error);
        }
        client.release();
    })

routerArrows.route("/arrows/:id/spines")
    .get(async (req, res) => {
        const client = await pool.connect();

        try {
            const id = parseInt(req.params.id);

            const resultat = await client.query("SELECT variant_id AS id, arrow_id AS from_arrow, spine, inner_diam AS inner_diameter, outer_diam AS outer_diameter, length, gpi, points FROM variants WHERE arrow_id = $1 ORDER BY spine DESC",
                [id]
            );

            res.json(resultat.rows)

        } catch (error) {
            res.sendStatus(500).send(error);
        }

        client.release();
    })

module.exports = routerArrows;