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
