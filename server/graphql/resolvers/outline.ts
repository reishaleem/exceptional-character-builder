import { createOutline, updateOutline } from "../../services/outline";

export function createOutlineResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
        name: args.name,
        type: args.type,
    };

    return createOutline(request);
}

export function updateOutlineResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
        outlineId: args.outlineId,
        name: args.name,
        body: args.body,
    };

    return updateOutline(request);
}
