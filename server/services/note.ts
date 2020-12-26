import { NoteFields } from "../models/Note";
import { User } from "../models/User";

export async function createNote(request: any) {
    let owner = await User.findById(request.ownerId).exec();
    if (owner == null) {
        throw `User with id ${request.ownerId} does not exist`;
    }

    let magicSystem = owner.magicSystems.find(
        (magicSystem) => magicSystem._id == request.magicSystemId
    );

    magicSystem?.notes.push({
        name: "Note",
        body: "",
    });

    try {
        owner = await owner.save();

        // return the last created note. Returning owner.save() would return the user itself.
        return magicSystem?.notes[magicSystem.notes.length - 1];
    } catch (error) {
        throw error;
    }
}

export async function updateNote(request: any) {
    let owner = await User.findById(request.ownerId).exec();
    if (owner == null) {
        throw `User with id ${request.ownerId} does not exist`;
    }

    let magicSystem = owner.magicSystems.find(
        (magicSystem) => magicSystem._id == request.magicSystemId
    );
    let note: NoteFields = magicSystem!.notes.find(
        (n) => n._id == request.noteId
    )!;
    note.name = request.name;
    note.body = request.body;

    try {
        owner = await owner.save();

        // return the last created note. Returning owner.save() would return the user itself.
        return note;
    } catch (error) {
        throw error;
    }
}

export async function deleteNote(request: any) {
    let owner = await User.findById(request.ownerId).exec();
    if (owner == null) {
        throw `User with id ${request.ownerId} does not exist`;
    }

    let magicSystem = owner.magicSystems.find(
        (magicSystem) => magicSystem._id == request.magicSystemId
    );
    let noteLocation: number = magicSystem!.notes.findIndex(
        (n) => n._id == request.noteId
    )!;

    magicSystem?.notes.splice(noteLocation, 1);

    try {
        owner = await owner.save();

        // return the last created note. Returning owner.save() would return the user itself.
        return "Successfully deleted Note";
    } catch (error) {
        throw error;
    }
}
