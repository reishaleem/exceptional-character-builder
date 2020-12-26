import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const NoteType = new GraphQLObjectType({
    name: "Note",
    description:
        "A Note object that is used for notes within a MagicSystem. It has a name and body, the body being a string of HTML.",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        body: { type: GraphQLString },
    }),
});
