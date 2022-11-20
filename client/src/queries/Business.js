import { gql } from "apollo-boost";

export const ADD_BUSINESS = gql`
  mutation AddBusiness($name: String!, $email: String!, $phoneNumber: String!) {
    addBusiness(name: $name, email: $email, phoneNumber: $phoneNumber) {
      id
      name
      email
      phoneNumber
    }
  }
`;

export const EDIT_BUSINESS = gql`
  mutation EditBusiness(
    $businessId: String!
    $name: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateBusiness(
      businessId: $businessId
      name: $name
      email: $email
      phoneNumber: $phoneNumber
    ) {
      id
      name
      email
      phoneNumber
    }
  }
`;

export const ALL_BUSINESSES = gql`
  query GetBusinesses($limit: Int!, $page: Int!) {
    paginatedBusinesses(limit: $limit, page: $page) {
      businesses {
        id
        name
        email
        phoneNumber
      }
      totalBusinesses
      currentPage
      perPage
      totalPages
    }
  }
`;

export const DELETE_BUSINESS = gql`
  mutation DeleteBusiness($businessId: String!) {
    deleteBusiness(businessId: $businessId) {
      id
      name
    }
  }
`;

export const GET_BUSINESSES = gql`
  {
    businesses {
      id
      name
    }
  }
`;
