class CustomError extends Error {
  constructor(message, name, code) {
    super(message);
    this.name = name;
    this.code = code;
  }
}

class ErrorAuth extends CustomError {
  constructor() {
    super("auth error", "AUTH_ERROR", 403);
  }
}

class ErrorKey extends CustomError {
  constructor() {
    super("key error", "KEY_ERROR", 403);
  }
}

class ErrorServer extends CustomError {
  constructor(message) {
    super(`server error: ${message}`, "SERVE_ERROR", 500);
  }
}

class ErrorUserInput extends CustomError {
  constructor(message) {
    super(`bad request: ${message}`, "BAD_REQUEST", 400);
  }
}

module.exports = {
  ErrorAuth,
  ErrorKey,
  ErrorServer,
  ErrorUserInput,
};
