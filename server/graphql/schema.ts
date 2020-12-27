import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { loginMutation, logoutMutation } from "./mutations/auth";
import {
    createMagicSystemMutation,
    deleteMagicSystemMutation,
    updateMagicSystemDetailsMutation,
    updateMagicSystemPageMutation,
} from "./mutations/magicSystem";
import {
    createNoteMutation,
    deleteNoteMutation,
    updateNoteMutation,
} from "./mutations/note";
import {
    createOutlineMutation,
    deleteOutlineMutation,
    updateOutlineMutation,
} from "./mutations/outline";
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
    }),
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation for updates, deletes, and creation",
    fields: () => ({
        login: loginMutation,
        logout: logoutMutation,
        createUser: createUserMutation,
        updateUserProfile: updateUserProfileMutation,
        updateUserPassword: updatePasswordMutation,
        deleteUser: deleteUserMutation,
        createMagicSystem: createMagicSystemMutation,
        updateMagicSystemDetails: updateMagicSystemDetailsMutation,
        updateMagicSystemPage: updateMagicSystemPageMutation,
        deleteMagicSystem: deleteMagicSystemMutation,
        createNote: createNoteMutation,
        updateNote: updateNoteMutation,
        deleteNote: deleteNoteMutation,
        createOutline: createOutlineMutation,
        updateOutline: updateOutlineMutation,
        deleteOutline: deleteOutlineMutation,
    }),
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
