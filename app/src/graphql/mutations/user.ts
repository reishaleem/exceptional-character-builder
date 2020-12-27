import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
            id
            name
        }
    }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
    mutation UpdateUserProfile(
        $id: ID!
        $name: String!
        $email: String!
        $penName: String!
        $bio: String
    ) {
        updateUserProfile(
            id: $id
            name: $name
            email: $email
            penName: $penName
            bio: $bio
        ) {
            id
        }
    }
`;

export const UPDATE_USER_SECURITY_MUTATION = gql`
    mutation UpdateUserSecurity(
        $id: ID!
        $currentPassword: String!
        $newPassword: String!
    ) {
        updateUserPassword(
            id: $id
            currentPassword: $currentPassword
            newPassword: $newPassword
        ) {
            id
        }
    }
`;

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;
