import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import routes from './apis/index';

dotenv.config();

//Connect Mongoose
const mongooseOptions = {
  autoIndex: false,
  readPreference: 'primaryPreferred',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect(process.env.DATABASE_HOST, mongooseOptions);
  console.info(`Connected to mongo`);
} catch (error) {
  console.error(`Could not start the app: `, error);
}

const app = express();
//session
app.use(
  session({
    secret: process.env.SECRET_SIGNED_SESSION_CODE,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600 * 7 * 1000 * 24 },
  }),
);
//OAuth setup
app.use(passport.initialize());
app.use(passport.session());
//rest
app.use(morgan('tiny'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', process.env.SECRET_FRONTEND_DOMAIN],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
    credentials: true,
  }),
);

app.use('/', routes);

export default app;
