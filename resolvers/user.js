const { UserInputError } = require("apollo-server-express");
const mongoose = require("mongoose");
const Joi = require("joi");

const { User } = require("../models");
const { validateUserInput } = require("../validation");

module.exports = {
  Query: {
    users: async (root, args, context, info) => {
      return await User.find({});
    },
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError("The user id is not valid!");
      }

      return User.findById(id);
    },
    paginatedUsers: async (root, { page, limit }, context, info) => {
      let totalUsers = await User.countDocuments();
      let offset = (page - 1) * limit;
      let usersData = await User.find().limit(limit).skip(offset);

      let result = {
        users: usersData,
        totalUsers: totalUsers,
        perPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
      };

      return result;
    },
  },
  Mutation: {
    addUser: async (root, args, context, info) => {
      await Joi.validate(args, validateUserInput, { abortEarly: false });
      return User.create(args);
    },

    updateUser: async (root, args, context, info) => {
      await Joi.validate(args, validateUserInput, { abortEarly: false });
      const validId = await User.findById(args.userId);

      if (validId === null) {
        throw new UserInputError("The user id is not valid!");
      }

      return User.findOneAndUpdate({ _id: args.userId }, args);
    },

    deleteUser: async (root, args, context, info) => {
      const validId = await User.findById(args.userId);

      if (validId === null) {
        throw new UserInputError("The user id is not valid!");
      }

      return User.findOneAndDelete({ _id: args.userId });
    },
  },
};
