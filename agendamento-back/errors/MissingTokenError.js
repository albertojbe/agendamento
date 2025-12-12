const AppError = require("./AppError");

class MissingTokenError extends AppError {
  constructor(message = "Token não fornecido") {
    super(message, 401);
  }
}

module.exports = MissingTokenError;
