import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { createNoteResolver } from "../resolvers/note";
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
