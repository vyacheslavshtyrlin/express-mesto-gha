const Cards = require('../models/card');
const NotFound = require('../errors/notFoundError');
const Conflict = require('../errors/conflictError');
const BadRequest = require('../errors/badRequest');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.code === 11000) {
        throw new Conflict('Пользователь с таким e-mail уже зарегестрирован');
      } else if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new BadRequest(error.message);
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findByIdAndRemove(req.params.cardId, { new: true })
    .then((card) => res.send({ data: card }))
    .orFail(() => {
      throw new NotFound('Нет карточки по заданному id');
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Нет карточки по заданному id');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Нет карточки по заданному id');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
