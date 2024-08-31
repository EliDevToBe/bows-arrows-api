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
// No functionnality at the moment :'(
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