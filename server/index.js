require("dotenv").config();
const tasks = require("./routes/tasks")
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const cors = require('cors')
const mongoose = require("mongoose");
const connection = require("./db");
const app = express();

connection();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/tasks", tasks);

app.use(
  session({
    secret: 'arbitary-string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

app.use(logger('common'));

app.get('/home', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/books/:bookId', (req, res) => {
  res.send(req.params);
});

app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));