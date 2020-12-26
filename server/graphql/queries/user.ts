import { GraphQLID, GraphQLList } from "graphql";
import { userResolver, usersResolver } from "../resolvers/user";
import { UserType } from "../typeDefs/User";

export const getAllUsersQuery = {
    type: GraphQLList(UserType),
    description: "A list of all Users",
    resolve: (_parent: any, _args: any) => {
        return usersResolver();
    },
};

export const getUserQuery = {
    type: UserType,
    description: "A single User",
    args: {
        id: { type: GraphQLID },
    },
    resolve: async (_parent: any, args: any) => {
        return userResolver(args);
    },
};
