import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createUserMutation } from "./mutations/user";
import { getAllUsersQuery } from "./queries/user";

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query for reads",
    fields: () => ({
        users: getAllUsersQuery,
    }),
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation for updates, deletes, and creation",
    fields: () => ({
        createUser: createUserMutation,
    }),
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
