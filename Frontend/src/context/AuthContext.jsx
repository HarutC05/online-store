import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
        } catch (err) {
            console.error("Failed to parse saved user:", err);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        alert("Logout successfull")
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};