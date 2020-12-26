import { GraphQLNonNull, GraphQLString } from "graphql";
import { createUserResolver } from "../resolvers/user";
import { UserType } from "../typeDefs/User";

export const createUserMutation = {
    type: UserType,
    description: "Creates a new User",
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return createUserResolver(args);
    },
};
