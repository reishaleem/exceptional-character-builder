import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { NoteType } from "./Note";
import { OutlineType } from "./Outline";

export const MagicSystemType = new GraphQLObjectType({
    name: "MagicSystem",
    description:
        "A MagicSystem, which is the objects Users create to use the app. Its important fields are its name, its page (a string of HTML), its notes (an array of Note), and its outlines (an array of Outline)",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        page: { type: GraphQLString },
        notes: { type: GraphQLList(NoteType) },
        outlines: { type: GraphQLList(OutlineType) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});
