const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    customers: [Customer!]!
    paginatedCustomers(limit: Int!, page: Int!): CustomerCount!
    customer(id: ID!): Customer
  }

  extend type Mutation {
    addCustomer(name: String!, email: String!, phoneNumber: String!): Customer
    updateCustomer(
      customerId: String!
      name: String!
      email: String!
      phoneNumber: String!
    ): Customer
    deleteCustomer(customerId: String!): Customer
  }

  type Customer {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
  }

  type CustomerCount {
    customers: [Customer!]!
    totalCustomers: Int!
    perPage: Int!
    currentPage: Int!
    totalPages: Int!
  }
`;
