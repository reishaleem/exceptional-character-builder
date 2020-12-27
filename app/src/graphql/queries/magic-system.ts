import { gql } from "@apollo/client";

export const GET_ALL_MAGIC_SYSTEMS_QUERY = gql`
    query GetAllMagicSystems {
        magicSystems {
            id
            name
            description
            updatedAt
        }
    }
`;

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

export const VIEW_MAGIC_SYSTEM_QUERY = gql`
    query ViewMagicSystem {
        magicSystems {
            id
            page
        }
    }
`;
