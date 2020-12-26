import { GraphQLList } from "graphql";
import { magicSystemsResolver } from "../resolvers/magicSystem";
import { MagicSystemType } from "../typeDefs/MagicSystem";

export const getAllMagicSystemsQuery = {
    type: GraphQLList(MagicSystemType),
    description: "A list of all Magic Systems",
    resolve: (_parent: any, _args: any) => {
        return magicSystemsResolver();
    },
};
