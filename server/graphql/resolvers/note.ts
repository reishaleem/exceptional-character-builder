import { createNote, deleteNote, updateNote } from "../../services/note";

export function createNoteResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
    };

    return createNote(request);
}

export function updateNoteResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
        noteId: args.noteId,
        name: args.name,
        body: args.body,
    };

    return updateNote(request);
}

export function deleteNoteResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
        noteId: args.noteId,
    };

    return deleteNote(request);
}
