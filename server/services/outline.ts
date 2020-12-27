import { historyTemplate } from "../graphql/constants/outline-templates";
import { User } from "../models/User";

export async function createOutline(request: any) {
    let owner = await User.findById(request.ownerId).exec();
    if (owner == null) {
        throw `User with id ${request.ownerId} does not exist`;
    }

    let magicSystem = owner.magicSystems.find(
        (magicSystem) => magicSystem._id == request.magicSystemId
    );

    magicSystem?.outlines.push({
        name: request.name,
        type: request.type,
        body: historyTemplate, // this needs to change to import whatever the request.type corresponds to.
    });

    try {
        owner = await owner.save();

        // return the last created outline. Returning owner.save() would return the user itself.
        return magicSystem?.outlines[magicSystem.outlines.length - 1];
    } catch (error) {
        throw error;
    }
}