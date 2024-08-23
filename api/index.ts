// ==== Express necessities ====
const express = require("express");
const app = express();
const PORT = 8080;

// ==== DB Necessities ====
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

// ==== Routes import =====
const homeRouter = require("./routes/home");
// ========================

app.get("/", async (req, res) => {

    const client = await pool.connect();
    const resultat = await client.query("SELECT * FROM arrows WHERE arrow_id = 1")

    res.json(resultat.rows);

    client.release();
});

app.use(homeRouter);

app.listen(PORT);
console.log(`Server ready on port ${PORT}.`)

module.exports = app;