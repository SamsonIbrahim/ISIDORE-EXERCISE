const Joi = require("joi");

module.exports = Joi.object().keys({
  businessId: Joi.string(),
  name: Joi.string()

    .required()
    .error(() => {
      return { message: "Business name is required!" };
    }),
  email: Joi.string()
    .email()
    .required()
    .error(() => {
      return { message: "Business email is required!" };
    }),
  phoneNumber: Joi.string()
    .required()
    .error(() => {
      return { message: "Business phone number is required!" };
    }),
});
