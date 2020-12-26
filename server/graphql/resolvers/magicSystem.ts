import {
    createMagicSystem,
    getAllMagicSystems,
} from "../../services/magicSystem";

export function magicSystemsResolver() {
    return getAllMagicSystems();
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
