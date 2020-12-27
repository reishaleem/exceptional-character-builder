import { createOutline } from "../../services/outline";

export function createOutlineResolver(args: any) {
    const request = {
        ownerId: args.ownerId,
        magicSystemId: args.magicSystemId,
        name: args.name,
        type: args.type,
    };

    return createOutline(request);
}
