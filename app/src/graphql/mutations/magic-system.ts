import { gql } from "@apollo/client";

export const CREATE_MAGIC_SYSTEM_MUTATION = gql`
    mutation CreateMagicSystem(
        $ownerId: ID!
        $name: String!
        $type: [String]!
        $hardnessRating: Int!
        $description: String!
    ) {
        createMagicSystem(
            ownerId: $ownerId
            name: $name
            type: $type
            hardnessRating: $hardnessRating
            description: $description
        ) {
            id
        }
    }
`;

export const UPDATE_MAGIC_SYSTEM_PAGE_MUTATION = gql`
    mutation UpdateMagicSystemPage(
        $ownerId: ID!
        $magicSystemId: ID!
        $page: String!
    ) {
        updateMagicSystemPage(
            ownerId: $ownerId
            magicSystemId: $magicSystemId
            page: $page
        ) {
            page
        }
    }
`;
