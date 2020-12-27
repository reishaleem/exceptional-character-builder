import {
    createMagicSystem,
    deleteMagicSystem,
    getAllMagicSystems,
    getMagicSystemById,
    updateMagicSystemDetails,
    updateMagicSystemPage,
} from "../../services/magicSystem";
import { updateMagicSystemPageMutation } from "../mutations/magicSystem";

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

export function updateMagicSystemDetailsResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
        name: args.name,
        type: args.type,
        hardnessRating: args.hardnessRating,
        description: args.description,
    };

    return updateMagicSystemDetails(request);
}

export function updateMagicSystemPageResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
        page: args.page,
    };

    return updateMagicSystemPage(request);
}

export function deleteMagicSystemResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
    };

    return deleteMagicSystem(request);
}
