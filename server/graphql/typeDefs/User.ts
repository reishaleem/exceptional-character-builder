import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { MagicSystemType } from "./MagicSystem";

export const UserType = new GraphQLObjectType({
    name: "User",
    description:
        "A User, with the details related to their profile and magic systems.",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        penName: { type: GraphQLString },
        bio: { type: GraphQLString },
        magicSystems: { type: GraphQLList(MagicSystemType) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});
