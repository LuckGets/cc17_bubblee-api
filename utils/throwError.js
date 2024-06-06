const throwError = (error) => {
  const err = new Error(error.message);
  err.statusCode = error.statusCode || 500;
  err.fields = error.fields
  throw err
}


module.exports = throwError