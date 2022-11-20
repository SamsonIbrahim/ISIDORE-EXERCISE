const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = Joi.object().keys({
  userId: Joi.string(),
  name: Joi.string()
    .required()
    .error(() => {
      return { message: "User name is required!" };
    }),
  email: Joi.string()
    .email()
    .required()
    .error(() => {
      return { message: "User email is required!" };
    }),
  phoneNumber: Joi.string()
    .required()
    .error(() => {
      return { message: "User phone number is required!" };
    }),
});
