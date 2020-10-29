import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-sessions';
import cookieParser from 'cookie-parser';
import flash from 'flash';

import routes from './routes/routes.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/test');

const PORT = 5000;
app.set('port', process.env.PORT || PORT);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware Stack
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: '',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// routes
app.use(routes);

// Listening
app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')}`);
});
