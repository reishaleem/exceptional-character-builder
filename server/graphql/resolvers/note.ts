import { createNote } from "../../services/note";

export function createNoteResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
    };

    return createNote(request);
}
