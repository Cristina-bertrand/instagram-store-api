const ApiError = require('../models/api-error.model');

module.exports.checkRole = (req, res, next) => {
  if (req.user.isAdmin) {
      next();
  } else {
      next(new ApiError('Forbidden', 403));
  }
};
