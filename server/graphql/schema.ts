import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
    createUserMutation,
    updatePasswordMutation,
    updateUserProfileMutation,
} from "./mutations/user";
import { getAllUsersQuery, getUserQuery } from "./queries/user";

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query for reads",
    fields: () => ({
        users: getAllUsersQuery,
        user: getUserQuery,
    }),
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation for updates, deletes, and creation",
    fields: () => ({
        createUser: createUserMutation,
        updateUserProfile: updateUserProfileMutation,
        updateUserPassword: updatePasswordMutation,
    }),
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
