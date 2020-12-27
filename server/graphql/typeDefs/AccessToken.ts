import { GraphQLObjectType, GraphQLString } from "graphql";

export const AccessToken = new GraphQLObjectType({
    name: "AccessToken",
    description: "An access token for authorization",
    fields: () => ({
        accessToken: { type: GraphQLString },
    }),
});
