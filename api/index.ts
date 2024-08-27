// ==== Express necessities ====
import express from "express"
const app = express();
// =============================

// ===== Other imports =====
import helmet from 'helmet';
// =========================

// ==== Routes import =====
import { homeRouter } from "./routes/home";
import { arrowsRouter } from "./routes/arrows";
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
app.use(arrowsRouter)
// ==============================


module.exports = app;