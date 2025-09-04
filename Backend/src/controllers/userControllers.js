import {
    createUser as createUserService,
    getUserByEmail as getUserByEmailService,
    validateUser as validateUserService,
    generateJWT as generateJWTService,
    getUserById as getUserByIdService,
    updateUser as updateUserService,
    deleteUser as deleteUserService
} from "../services/userService.js";

export const createUser = async (req, res) => {
    try {
        const newUserId = await createUserService(req.body);
        const newUser = await getUserByIdService(newUserId);

        if (!newUser) {
            return res.status(500).json({ error: "Failed to fetch newly created user" });
        }

        const token = await generateJWTService(newUser);

        console.log("Register response:", { user: newUser, token });
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmailService(email);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Successfully fetched user", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const validateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await validateUserService(email, password);
        if (!user) return res.status(404).json({ message: "User not found" });
        const token = await generateJWTService(user);
        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const generateJWT = async (req, res) => {
    try {
        const token = await generateJWTService(req.body);
        res.status(200).json({ message: "Successfully created JWT", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await getUserByIdService(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Successfully found user", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updated = await updateUserService(id, req.body);
        if (!updated) return res.status(404).json({ message: "Could not update user" });
        res.status(200).json({ message: "User info updated successfully", updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const requestingUserId = req.user.id;
        const deleted = await deleteUserService(id, requestingUserId);
        if (!deleted) return res.status(404).json({ message: "Could not delete user" });
        res.status(200).json({ message: "User successfully deleted", deleted });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};