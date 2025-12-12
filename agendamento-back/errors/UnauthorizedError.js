const AppError = require("./AppError");

class UnauthorizedError extends AppError {
  constructor(message = "Token inválido ou expirado") {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
