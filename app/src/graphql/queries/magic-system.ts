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

export const GET_MAGIC_SYSTEM_QUERY = gql`
    query GetMagicSystem($ownerId: ID!, $magicSystemId: ID!) {
        magicSystem(ownerId: $ownerId, magicSystemId: $magicSystemId) {
            id
            name
            description
            hardnessRating
            type
            page
            notes {
                id
                name
                body
            }
            outlines {
                id
                name
                type
                body
            }
            updatedAt
        }
    }
`;
