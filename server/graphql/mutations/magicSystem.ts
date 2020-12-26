import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import {
    createMagicSystemResolver,
    deleteMagicSystemResolver,
} from "../resolvers/magicSystem";
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

export const deleteMagicSystemMutation = {
    type: GraphQLString,
    description:
        "Deleted a new MagicSystem for a User with the matching id and with the matching system id",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        magicSystemId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_parent: any, args: any) => {
        return deleteMagicSystemResolver(args);
    },
};
