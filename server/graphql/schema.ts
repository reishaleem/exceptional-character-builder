import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
    createMagicSystemMutation,
    deleteMagicSystemMutation,
} from "./mutations/magicSystem";
import {
    createUserMutation,
    deleteUserMutation,
    updatePasswordMutation,
    updateUserProfileMutation,
} from "./mutations/user";
import {
    getAllMagicSystemsQuery,
    getMagicSystemQuery,
    getUserMagicSystemsQuery,
} from "./queries/magicSystem";
import { getAllUsersQuery, getUserQuery } from "./queries/user";

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query for reads",
    fields: () => ({
        users: getAllUsersQuery,
        user: getUserQuery,
        magicSystems: getAllMagicSystemsQuery,
        userMagicSystems: getUserMagicSystemsQuery,
        magicSystem: getMagicSystemQuery,
    }),
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation for updates, deletes, and creation",
    fields: () => ({
        createUser: createUserMutation,
        updateUserProfile: updateUserProfileMutation,
        updateUserPassword: updatePasswordMutation,
        deleteUser: deleteUserMutation,
        createMagicSystem: createMagicSystemMutation,
        deleteMagicSystem: deleteMagicSystemMutation,
    }),
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
