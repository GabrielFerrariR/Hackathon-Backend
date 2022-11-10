const BadRequest = require("../../errors/BadRequest");

function validateSchema(schema, data) {
  const { error } = schema.validate(data);

  if (error) throw new BadRequest(error.message);
}

module.exports = {
  validateSchema,
};
