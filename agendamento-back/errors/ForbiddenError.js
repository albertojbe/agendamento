const AppError = require("./AppError");

class ForbiddenError extends AppError {
  constructor(message = "Acesso proibido") {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
