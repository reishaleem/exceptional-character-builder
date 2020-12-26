import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { createMagicSystemResolver } from "../resolvers/magicSystem";
import { MagicSystemType } from "../typeDefs/MagicSystem";

export const createMagicSystemMutation = {
    type: MagicSystemType,
    description: "Creates a new MagicSystem for a User with the matching id",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLList(GraphQLString) },
        hardnessRating: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return createMagicSystemResolver(args);
    },
};
