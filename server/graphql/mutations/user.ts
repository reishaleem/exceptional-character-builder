import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import {
    createUserResolver,
    updateUserPasswordResolver,
    updateUserProfileResolver,
} from "../resolvers/user";
import { UserType } from "../typeDefs/User";

export const createUserMutation = {
    type: UserType,
    description: "Creates a new User",
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return createUserResolver(args);
    },
};

export const updateUserProfileMutation = {
    type: UserType,
    description: "Update a user",
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        penName: { type: GraphQLNonNull(GraphQLString) },
        bio: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return updateUserProfileResolver(args);
    },
};

export const updatePasswordMutation = {
    type: UserType,
    description: "Change a user's password",
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        currentPassword: { type: GraphQLNonNull(GraphQLString) },
        newPassword: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return updateUserPasswordResolver(args);
    },
};
