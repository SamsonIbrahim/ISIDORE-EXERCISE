const { UserInputError } = require("apollo-server-express");
const mongoose = require("mongoose");
const Joi = require("joi");

const { Customer } = require("../models");
const { validateCustomerInput } = require("../validation");

module.exports = {
  Query: {
    customers: async (root, args, context, info) => {
      return await Customer.find({});
    },
    customer: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError("The customer id is not valid!");
      }

      return Customer.findById(id);
    },
    paginatedCustomers: async (root, { page, limit }, context, info) => {
      let totalCustomers = await Customer.countDocuments();
      let offset = (page - 1) * limit;
      let customersData = await Customer.find().limit(limit).skip(offset);

      let result = {
        customers: customersData,
        totalCustomers: totalCustomers,
        perPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalCustomers / limit),
      };

      return result;
    },
  },
  Mutation: {
    addCustomer: async (root, args, context, info) => {
      await Joi.validate(args, validateCustomerInput, { abortEarly: false });

      return Customer.create(args);
    },

    updateCustomer: async (root, args, context, info) => {
      await Joi.validate(args, validateCustomerInput, { abortEarly: false });
      const validId = await Customer.findById(args.customerId);

      if (validId === null) {
        throw new UserInputError("The customer id is not valid!"); // This userInputError
      }

      return Customer.findOneAndUpdate({ _id: args.customerId }, args);
    },

    deleteCustomer: async (root, args, context, info) => {
      const validId = await Customer.findById(args.customerId);

      console.log(validId, "validId");

      if (validId === null) {
        throw new UserInputError("The customer id is not valid!");
      }

      return Customer.findOneAndDelete({ _id: args.customerId });
    },
  },
};
