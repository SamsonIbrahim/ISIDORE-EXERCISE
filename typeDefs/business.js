const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    businesses: [Business!]!
    paginatedBusinesses(limit: Int!, page: Int!): BusinessCount!
    business(id: ID!): Business
  }

  extend type Mutation {
    addBusiness(name: String!, email: String!, phoneNumber: String!): Business
    updateBusiness(
      businessId: String!
      name: String!
      email: String!
      phoneNumber: String!
    ): Business
    deleteBusiness(businessId: String!): Business
  }

  type Business {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
  }

  type BusinessCount {
    Businesses: [Business!]!
    totalBusinesses: Int!
    perPage: Int!
    currentPage: Int!
    totalPages: Int!
  }
`;
