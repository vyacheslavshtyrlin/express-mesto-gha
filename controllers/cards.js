const Cards = require('../models/card');

const { errorHandler } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId, { new: true })
    .then((card) => res.send({ data: card }))
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.name = 'NotFound';
      throw error;
    })
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.name = 'NotFound';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.name = 'NotFound';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      const errorCode = errorHandler(error);
      if (errorCode === 500) {
        res.status(errorCode).send({ message: 'Server Error 500' });
      } else {
        res.status(errorCode).send({ message: error.message });
      }
    });
};
