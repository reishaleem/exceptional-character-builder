import {
    createMagicSystem,
    deleteMagicSystem,
    getAllMagicSystems,
    getMagicSystemById,
    getMagicSystemsByUserId,
} from "../../services/magicSystem";

export function magicSystemsResolver() {
    return getAllMagicSystems();
}

export function userMagicSystemsResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
    };

    return getMagicSystemsByUserId(request);
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

export function deleteMagicSystemResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
    };

    return deleteMagicSystem(request);
}
