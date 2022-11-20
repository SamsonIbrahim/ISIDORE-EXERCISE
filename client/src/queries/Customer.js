import { gql } from "apollo-boost";

export const ADD_CUSTOMER = gql`
  mutation AddCustomer($name: String!, $email: String!, $phoneNumber: String!) {
    addCustomer(name: $name, email: $email, phoneNumber: $phoneNumber) {
      id
      name
      email
      phoneNumber
    }
  }
`;

export const EDIT_CUSTOMER = gql`
  mutation EditCustomer(
    $customerId: String!
    $name: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateCustomer(
      customerId: $customerId
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

export const ALL_CUSTOMERS = gql`
  query GetCustomers($limit: Int!, $page: Int!) {
    paginatedCustomers(limit: $limit, page: $page) {
      customers {
        id
        name
        email
        phoneNumber
      }
      totalCustomers
      currentPage
      perPage
      totalPages
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($customerId: String!) {
    deleteCustomer(customerId: $customerId) {
      id
      name
    }
  }
`;

export const GET_CUSTOMERS = gql`
  {
    customers {
      id
      name
    }
  }
`;
