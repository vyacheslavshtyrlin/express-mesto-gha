const bcrypt = require('bcrypt');
const User = require('../models/user');

const { errorHandler } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('Нет пользователя по заданному id');
      error.name = 'NotFound';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => res.send({
          data: {
            name, about, avatar, email,
          },
        }))
        .catch((error) => {
          const errorCode = errorHandler(error);
          if (errorCode === 500) {
            res.status(errorCode).send({ message: 'Server Error 500' });
          } else {
            res.status(errorCode).send({ message: error.message });
          }
        });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error('Нет пользователя по заданному id');
      error.name = 'NotFound';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error('Нет пользователя по заданному id');
      error.name = 'NotFound';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};
