
class AppError extends Error {

  // statusCode;

  constructor(message, statusCode) {
    // Calling the constructor of the parent class (Error)
    super(message);

    this.statusCode = statusCode;
    this.name = this.constructor.name; // Sets the name to the class name

    // Captures stack trace, 
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}


class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}


class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}


class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export {
  AppError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ConflictError
};
