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

export const CREATE_OUTLINE_MUTATION = gql`
    mutation CreateOutline(
        $ownerId: ID!
        $magicSystemId: ID!
        $name: String!
        $type: String!
    ) {
        createOutline(
            ownerId: $ownerId
            magicSystemId: $magicSystemId
            name: $name
            type: $type
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

export const UPDATE_OUTLINE_MUTATION = gql`
    mutation UpdateOutline(
        $ownerId: ID!
        $magicSystemId: ID!
        $outlineId: ID!
        $name: String!
        $body: String!
    ) {
        updateOutline(
            ownerId: $ownerId
            magicSystemId: $magicSystemId
            outlineId: $outlineId
            name: $name
            body: $body
        ) {
            body
        }
    }
`;
