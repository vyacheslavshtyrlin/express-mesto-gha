const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/notFoundError');
const Conflict = require('../errors/conflictError');
const BadRequest = require('../errors/badRequest');

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;
  User.findUserByCredentials(password, email)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'somekey', { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true });
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFound('Не найдено ни одного пользователя');
    })
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFound('Нет пользователя по заданному id');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.send({ data: user }))
        .catch((error) => {
          if (error.code === 11000) {
            throw new Conflict('Пользователь с таким e-mail уже зарегестрирован');
          } else if (error.name === 'ValidationError' || error.name === 'CastError') {
            throw new BadRequest(error.message);
          }
        })
        .catch(next);
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new BadRequest(error.message);
      }
    })
    .catch(next);
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new BadRequest(error.message);
      }
    })
    .catch(next);
};
