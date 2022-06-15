const errorCodes = {
  validationError: 400,
  notFoundError: 404,
  otherError: 500,
};

module.exports.errorHandler = (error) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') return errorCodes.validationError;
  if (error.name === 'NotFound') return errorCodes.notFoundError;
  return errorCodes.otherError;
};
