// ==== Express necessities ====
const express = require("express");
const app = express();
// const PORT = 3000;
// =============================

// ===== Other imports =====
const helmet = require("helmet");
// =========================

// ==== DB Necessities ====
// require("dotenv").config();

// const pg = require("pg");
// const connectionString = process.env.DATABASE_URL;
// const { Client, Pool } = pg;

// // Create pool ready to queries
// const pool = new Pool(
//     { connectionString }
// );

// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err)
//     process.exit(-1)
// });
// ========================

// ==== Routes import =====
const homeRoutes = require("./routes/home");
const arrowsRoutes = require("./routes/arrows");
// ========================

// app.get("/", async (req, res) => {

//     const client = await pool.connect();
//     const resultat = await client.query("SELECT * FROM arrows WHERE arrow_id = 1")

//     res.json(resultat.rows);

//     client.release();


// });

// ===== MISC Middlewares =====
app.use(helmet());
// reduce fingerprinting express
app.disable('x-powered-by');
const createCache = require("./middlewares");
const cache = createCache(300)
app.use(cache);
// ============================

// ===== Router middlewares =====
app.use(homeRoutes);
app.use(arrowsRoutes);
// ==============================

// console.log(`Server ready on port ${PORT}.`)
// app.listen(PORT);

module.exports = app;