import { gql } from "@apollo/client";

export const GET_USER_MAGIC_SYSTEMS_LIST_QUERY = gql`
    query GetUserMagicSystemsList($id: ID!) {
        user(id: $id) {
            magicSystems {
                id
                name
                description
                updatedAt
            }
        }
    }
`;
