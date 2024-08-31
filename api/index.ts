// ==== Express necessities ====
import express from "express"
const app = express();
import path from "path";
// =============================

// ===== Other imports =====
import helmet from 'helmet';
import { onlyGetMethodAllowed } from "./middlewares";
// =========================

// ==== Routes import =====
import { homeRouter } from "./routes/home";
import { arrowsRouter } from "./routes/arrows";
import { brandsRouter } from "./routes/brands";
// ========================

// ===== MISC Middlewares =====
// --------------- TESTING CACHING ------------------
const NodeCache = require("node-cache");
export const myCache = new NodeCache({ stdTTl: 120, checkperiod: 300 });
app.use((req, res, next) => {
    const key = req.originalUrl;
    if (myCache.has(key)) {
        console.log("USING cache")
        res.send(myCache.get(key));
        return
    } else {
        next();
    }
})
// ----------------------------------------------
app.use(helmet());
// reduce fingerprinting express
app.disable('x-powered-by');
// ============================

// ===== Router middlewares =====
app.use(onlyGetMethodAllowed())
app.use(homeRouter);
app.use(arrowsRouter);
app.use(brandsRouter);
app.use(express.static(path.join(__dirname, "public")));
// ==============================

module.exports = app;