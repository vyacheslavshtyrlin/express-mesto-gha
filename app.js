const express = require('express');

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const NotFound = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

const auth = require('./middlewares/auth');

const error = require('./middlewares/errors');

const { login, createUser } = require('./controllers/users');

const users = require('./routes/users');

const cards = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mydb', {
});

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.post('/signin', login);

app.post('/signup', createUser);

app.use((req, res, next) => {
  next(new NotFound('Страницы не существует'));
});

app.use(auth);

app.use('/users', users);

app.use('/cards', cards);

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
