import express from "express";
import cors  from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js"
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/userRoutes.js";
import TanamanRoute from "./routes/tanamanRoutes.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});
app.use('/public',express.static('public'));
// (async()=>{
//     await db.sync()
// })();
app.use(session({
    secret: process.env.SESS_SECRTE,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure:'auto'
    }
}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use(express.json());
// middleware router
app.use(UserRoute);
app.use(TanamanRoute);
app.use(AuthRoute);
// store.sync();
app.listen(process.env.APP_PORT, () =>{
    console.log('Server RUNNING .....');
});