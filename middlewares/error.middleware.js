

export const genericErrorHandler = (err, req, res, next) => {
  // Log the full error to the server console for debugging
  console.log('error from generic error', err);

  // Determine the HTTP status code. If the error doesn't have one, default to 500.
  const statusCode = err.statusCode || 500;

  // Send a standardized JSON error response to the client.
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
};
