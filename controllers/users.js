const User = require('../models/user');

const { errorController } = require('./errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(errorController(error)).send({ message: error.message }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('Нет пользователя по заданному id');
      error.name = 'NotFound';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(errorController(error)).send({ message: error.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(errorController(error)).send({ message: error.message }));
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
    .catch((error) => res.status(errorController(error)).send({ message: error.message }));
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
    .catch((error) => res.status(errorController(error)).send({ message: error.message }));
};
