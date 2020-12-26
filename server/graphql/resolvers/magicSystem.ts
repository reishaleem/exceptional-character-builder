import {
    createMagicSystem,
    getAllMagicSystems,
    getMagicSystemById,
} from "../../services/magicSystem";

export function magicSystemsResolver() {
    return getAllMagicSystems();
}

export function magicSystemResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
    };

    return getMagicSystemById(request);
}

export function createMagicSystemResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        name: args.name,
        type: args.type,
        hardnessRating: args.hardnessRating,
        description: args.description,
    };

    return createMagicSystem(request);
}
