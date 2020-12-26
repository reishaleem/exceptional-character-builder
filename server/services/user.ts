import { CreateUserRequest } from "../graphql/types/user";
import { MagicSystemFields } from "../models/MagicSystem";
import { User } from "../models/User";
import { encryptPassword } from "./auth";

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
