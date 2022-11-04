const BadRequest = require("../../errors/BadRequest");
const { userRegistrationSchema } = require("./schemas");

function validateUserRegistration(data) {
  const { error } = userRegistrationSchema.validate(data);

  if (error) throw new BadRequest(error.message);
}

module.exports = {
  validateUserRegistration,
};
