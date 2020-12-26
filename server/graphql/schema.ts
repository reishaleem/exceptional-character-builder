import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
    createMagicSystemMutation,
    deleteMagicSystemMutation,
} from "./mutations/magicSystem";
import { createNoteMutation } from "./mutations/note";
import {
    createUserMutation,
    deleteUserMutation,
    updatePasswordMutation,
    updateUserProfileMutation,
} from "./mutations/user";
import {
    getAllMagicSystemsQuery,
    getMagicSystemQuery,
} from "./queries/magicSystem";
import { getAllUsersQuery, getUserQuery } from "./queries/user";

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query for reads",
    fields: () => ({
        users: getAllUsersQuery,
        user: getUserQuery,
        magicSystems: getAllMagicSystemsQuery,
        magicSystem: getMagicSystemQuery,
        // get individual note
        // get individual outline
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
        // update system Page
        deleteMagicSystem: deleteMagicSystemMutation,
        createNote: createNoteMutation,
        // update note
        // delete note
        //create outline
        // update outline
        // delete outline
    }),
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
