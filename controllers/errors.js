const errorCodes = {
  castError: 404,
  validationError: 400,
  otherError: 500,
};

module.exports.errorController = (error) => {
  if (error.name === 'CastError') return errorCodes.castError;
  if (error.name === 'ValidationError') return errorCodes.validationError;
  return errorCodes.otherError;
};
