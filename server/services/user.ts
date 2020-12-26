import { request } from "express";
import { CreateUserRequest } from "../graphql/types/user";
import { MagicSystemFields } from "../models/MagicSystem";
import { User } from "../models/User";
import { encryptPassword, verifyPassword } from "./auth";

export async function getAllUsers() {
    try {
        return await User.find();
    } catch (error) {
        throw error;
    }
}

export async function getUserById(id: string) {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error(`No user with id ${id} exists`);
    }
}

export async function createUser(user: CreateUserRequest) {
    const email: string = user.email;
    const name: string = user.name;
    const penName: string = email; // users do not edit their pen names when creating, so it starts as the email
    const bio: string = ""; // users do not edit their bios when creating, so it starts empty
    const magicSystems: MagicSystemFields[] = [];

    let password = null;
    try {
        password = await encryptPassword(user.password);
    } catch (error) {
        throw new Error("Something went wrong. Please try again.");
    }

    const newUser = new User({
        name,
        email,
        password,
        penName,
        bio,
        magicSystems,
    });

    try {
        return await newUser.save();
    } catch (error) {
        if (error.code === 11000) {
            // this is the only duplicate key error (11000) that can occur at this stage
            throw new Error("That email is already in use!");
        }
        throw error;
    }
}

export async function updateUserProfile(request: any) {
    const email: string = request.email;
    const name: string = request.name;
    const penName: string = request.penName;
    const bio: string = request.bio;

    let user = null;
    try {
        user = await User.findById(request.id);
    } catch (error) {
        throw error;
    }

    user!.email = email;
    user!.name = name;
    user!.penName = penName;
    user!.bio = bio;

    try {
        return await user!.save();
    } catch (error) {
        if (error.code === 11000) {
            // this is the only duplicate key error (11000) that can occur at this stage
            throw new Error("That email is already in use!");
        }
        throw error;
    }
}

export async function updateUserPassword(request: any) {
    const currentPassword = request.currentPassword;
    const newPassword = request.newPassword;

    let user = null;
    try {
        user = await User.findById(request.id);
    } catch (error) {
        throw error;
    }

    let passwordMatches = null;
    try {
        passwordMatches = await verifyPassword(currentPassword, user!.password);
    } catch (error) {
        throw new Error("Current password is incorrect");
    }

    if (passwordMatches) {
        let password = null;
        try {
            password = await encryptPassword(newPassword);
        } catch (error) {
            throw new Error("Something went wrong. Please try again.");
        }

        user!.password = password;
        try {
            return await user!.save();
        } catch (error) {
            throw error;
        }
    } else {
        throw new Error("Current password is incorrect");
    }
}

export async function deleteUser(user: any) {
    try {
        // log the user out, then proceed to delete
        return await User.deleteOne({ _id: user.id });
    } catch (error) {
        throw error;
    }
}
