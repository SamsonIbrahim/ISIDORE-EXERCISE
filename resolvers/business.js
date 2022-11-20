const { UserInputError } = require("apollo-server-express");
const mongoose = require("mongoose");
const Joi = require("joi");

const { Business } = require("../models");
const { validateBusinessInput } = require("../validation");

module.exports = {
  Query: {
    businesses: async (root, args, context, info) => {
      return await Business.find({});
    },
    business: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError("The business id is not valid!");
      }

      return Business.findById(id);
    },
    paginatedBusinesses: async (root, { page, limit }, context, info) => {
      let totalBusinesses = await Business.countDocuments();
      let offset = (page - 1) * limit;
      let businessesData = await Business.find().limit(limit).skip(offset);

      let result = {
        businesses: businessesData,
        totalBusinesses: totalBusinesses,
        perPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalBusinesses / limit),
      };

      return result;
    },
  },

  Mutation: {
    addBusiness: async (root, args, context, info) => {
      await Joi.validate(args, validateBusinessInput, { abortEarly: false });

      return Business.create(args);
    },

    updateBusiness: async (root, args, context, info) => {
      await Joi.validate(args, validateBusinessInput, { abortEarly: false });
      const validId = await Business.findById(args.businessId);

      if (validId === null) {
        throw new UserInputError("The business id is not valid!");
      }

      return Business.findOneAndUpdate({ _id: args.businessId }, args);
    },

    deleteBusiness: async (root, args, context, info) => {
      const validId = await Business.findById(args.businessId);

      if (validId === null) {
        throw new UserInputError("The business id is not valid!");
      }

      return Business.findOneAndDelete({ _id: args.businessId });
    },
  },
};
