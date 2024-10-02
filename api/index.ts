// ==== Express necessities ====
import express from "express"
const app = express();
import path from "path";
// =============================

// ===== Other imports =====
import helmet from 'helmet';
import { onlyGetMethodAllowed } from "./utils/onlyGet";
// const cors = require("cors");
// const { createClient } = require("./utils/supabase");
// =========================

// ==== Routes import =====
import { homeRouter } from "./routes/home";
import { arrowsRouter } from "./routes/arrows";
import { brandsRouter } from "./routes/brands";
import { AuthRouter } from "./routes/test_auth";
import { noSleepRouter } from "./routes/noSleep";
// ========================

// ===== MISC Middlewares =====
// --------------- TESTING CACHING ------------------
// No functionnality at the moment :'(
// ----------------------------------------------
app.use(helmet());
// app.use(cors());
// reduce fingerprinting express
app.disable('x-powered-by');
// ============================

// == /!\ ONLY FOR DEV TESTS !!!!!! =================
// app.use((req, res, next) => {
//     res.setHeader(
//         'Content-Security-Policy',
//         "default-src 'self'; connect-src 'self' http://localhost:3000; style-src 'self'"
//     );
//     next();
// });
// ===================================

// ===== Router middlewares =====
app.use(noSleepRouter);
// app.use(AuthRouter);
app.use(onlyGetMethodAllowed());
app.use(homeRouter);
app.use(arrowsRouter);
app.use(brandsRouter);
app.use(express.static(path.join(__dirname, "public")));
// ==============================

// app.post("/hello-world", async function (req, res, next) {
//     const { email, emailConfirm } = req.body

//     const supabase = createClient({ req, res })
// })

module.exports = app;