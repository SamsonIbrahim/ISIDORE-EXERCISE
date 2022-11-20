const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User!]!
    user(id: ID!): User
    paginatedUsers(limit: Int!, page: Int!): UserCount!
  }

  extend type Mutation {
    addUser(name: String!, email: String!, phoneNumber: String!): User
    updateUser(
      userId: String!
      name: String!
      email: String!
      phoneNumber: String!
    ): User
    deleteUser(userId: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
  }

  type UserCount {
    users: [User!]!
    totalUsers: Int!
    perPage: Int!
    currentPage: Int!
    totalPages: Int!
  }
`;
