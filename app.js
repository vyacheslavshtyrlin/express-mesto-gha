const express = require('express');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const users = require('./routes/users');

const cards = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mydb');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use('/users', users);

app.use('/cards', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'NotFound' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
