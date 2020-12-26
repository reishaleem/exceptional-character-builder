import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { createNoteResolver, updateNoteResolver } from "../resolvers/note";
import { NoteType } from "../typeDefs/Note";

export const createNoteMutation = {
    type: NoteType,
    description:
        "Creates a new note in the magic system with a matching ID, belonging to the user with a matching ID",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        magicSystemId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return createNoteResolver(args);
    },
};

export const updateNoteMutation = {
    type: NoteType,
    description: "Updates a Note with the incoming body and name",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        magicSystemId: { type: GraphQLNonNull(GraphQLString) },
        noteId: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return updateNoteResolver(args);
    },
};
