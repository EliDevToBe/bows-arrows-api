// ==== Express necessities ====
import express from "express"
const app = express();
import path from "path";
// =============================

// ===== Other imports =====
import helmet from 'helmet';
import { onlyGetMethodAllowed } from "./utils/onlyGet";
// =========================

// ==== Routes import =====
import { homeRouter } from "./routes/home";
import { arrowsRouter } from "./routes/arrows";
import { brandsRouter } from "./routes/brands";
import { AuthRouter } from "./routes/test_auth";
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
app.use(AuthRouter)
app.use(onlyGetMethodAllowed());
app.use(homeRouter);
app.use(arrowsRouter);
app.use(brandsRouter);
app.use(express.static(path.join(__dirname, "public")));
// ==============================

module.exports = app;