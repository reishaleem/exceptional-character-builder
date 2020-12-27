import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { createOutlineResolver } from "../resolvers/outline";
import { OutlineType } from "../typeDefs/Outline";

export const createOutlineMutation = {
    type: OutlineType,
    description:
        "Creates a new outline in the magic system with a matching ID, belonging to the user with a matching ID",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        magicSystemId: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return createOutlineResolver(args);
    },
};
