import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const OutlineType = new GraphQLObjectType({
    name: "Outline",
    description:
        "A Outline object that is used for brainstorming within a MagicSystem. It has a name, a type, and a body. The type is the type of Outline, predefined by the application. The body is a string of HMTL",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        body: { type: GraphQLString },
    }),
});
