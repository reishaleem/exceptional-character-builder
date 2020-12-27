import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
import { loginResolver, logoutResolver } from "../resolvers/auth";

import { AccessToken } from "../typeDefs/AccessToken";

export const loginMutation = {
    type: AccessToken,
    description: "Logs a User in, giving them an AccessToken",
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any, context: any) => {
        return loginResolver(args, context);
    },
};

export const logoutMutation = {
    type: GraphQLBoolean,
    description: "Logs a User out by clearing the refresh token",
    resolve: async (_parent: any, _args: any, context: any) => {
        return logoutResolver(context);
    },
};
