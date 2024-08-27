// ==== Express necessities ====
import express from "express"
const app = express();
import path from "path";
// =============================

// ===== Other imports =====
import helmet from 'helmet';
// =========================

// ==== Routes import =====
import { homeRouter } from "./routes/home";
import { arrowsRouter } from "./routes/arrows";
import { brandsRouter } from "./routes/brands";
// ========================

// ===== MISC Middlewares =====
app.use(helmet());
// reduce fingerprinting express
app.disable('x-powered-by');
// --------------- TESTING CACHING ------------------
// const createCache = require("./middlewares");
// const cache = createCache(300)
// app.use(createCache());
// ============================

// ===== Router middlewares =====
app.use(homeRouter);
app.use(arrowsRouter);
app.use(brandsRouter);
app.use(express.static(path.join(__dirname, "public")));
// ==============================


module.exports = app;