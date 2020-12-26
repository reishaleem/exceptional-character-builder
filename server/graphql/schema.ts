import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { createUserMutation } from "./mutations/user";

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query for reads",
    fields: () => ({
        hello: {
            type: GraphQLString,
            description: "test hello",
            resolve: (_parent: any, _args: any) => {
                return "Hello world";
            },
        },
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
