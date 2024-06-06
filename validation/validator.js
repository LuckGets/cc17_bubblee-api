const validator = (schema, req, res, next) => {
  const {value,error} = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.input = value
  next()
};

module.exports = validator;
