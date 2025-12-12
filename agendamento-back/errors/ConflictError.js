class ConflictError extends require("./AppError") {
  constructor(message = "Conflito de dados") {
    super(message, 409);
  }
}

module.exports = ConflictError;