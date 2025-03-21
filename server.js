const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const booksController = require('./controllers/books.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const path = require("path");
const List = require("./models/bookList.js");
const data = require("./models/data.json");
const usersController = require("./controllers/users.js");


const authController = require('./controllers/auth.js');
const listsController = require("./controllers/lists.js");
const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// List.create(data).then((data) => {
//   console.log(data);
// }).catch(error => console.log(error))

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/books', booksController);
app.use("/lists", listsController);
app.use("/users", usersController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
