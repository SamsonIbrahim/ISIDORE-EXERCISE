const Joi = require("joi");

module.exports = Joi.object().keys({
  customerId: Joi.string(),
  name: Joi.string()
    .required()
    .error(() => {
      return { message: "Customer name is required!" };
    }),
  email: Joi.string()
    .email()
    .required()
    .error(() => {
      return { message: "Customer email is required!" };
    }),
  phoneNumber: Joi.string()
    .required()
    .error(() => {
      return { message: "Customer phone number is required!" };
    }),
});
