import { MagicSystemFields, magicSystemSchema } from "../models/MagicSystem";
import { User } from "../models/User";

export async function createMagicSystem(magicSystem: any) {
    const name = magicSystem.name;
    const type = magicSystem.type;
    const hardnessRating = magicSystem.hardnessRating;
    const description = magicSystem.description;

    let owner = await User.findById(magicSystem.ownerId).exec();
    if (owner == null) {
        throw `User with id ${magicSystem.ownerId} does not exist`;
    }

    owner.magicSystems.push({
        name: name,
        type: type,
        hardnessRating: hardnessRating,
        description: description,
        page: "",
        notes: [],
        outlines: [],
    });

    try {
        owner = await owner.save();

        // return the last created magicSystem. Returning owner.save() would return the user itself.
        return owner.magicSystems[owner.magicSystems.length - 1];
    } catch (error) {
        throw error;
    }
}

export async function getAllMagicSystems() {
    const users = await User.find();
    let magicSystems: MagicSystemFields[] = [];

    users.forEach((user) => {
        user.magicSystems.forEach((magicSystem) => {
            magicSystems.push(magicSystem);
        });
    });

    return magicSystems;
}
