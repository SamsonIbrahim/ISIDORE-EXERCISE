import { gql } from "apollo-boost";

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $phoneNumber: String!) {
    addUser(name: $name, email: $email, phoneNumber: $phoneNumber) {
      id
      name
      email
      phoneNumber
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser(
    $userId: String!
    $name: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateUser(
      userId: $userId
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

export const ALL_USERS = gql`
  query GetUsers($limit: Int!, $page: Int!) {
    paginatedUsers(limit: $limit, page: $page) {
      users {
        id
        name
        email
        phoneNumber
      }
      totalUsers
      currentPage
      perPage
      totalPages
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      id
      name
    }
  }
`;

export const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;
