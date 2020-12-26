import { GraphQLList } from "graphql";
import { usersResolver } from "../resolvers/user";
import { UserType } from "../typeDefs/User";

export const getAllUsersQuery = {
    type: GraphQLList(UserType),
    description: "A list of all Users",
    resolve: (_parent: any, _args: any) => {
        return usersResolver();
    },
};
