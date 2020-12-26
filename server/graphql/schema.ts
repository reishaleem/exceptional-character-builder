import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

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

export default new GraphQLSchema({
    query: RootQuery,
    mutation: undefined,
});
