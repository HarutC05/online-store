import { registerUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

import "../styles/pageStyles/Register.css"

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = { email, username, password, role: "user" };
            const response = await registerUser(userInfo);
            const userData = response.user;
            const token = response.token;
            login(userData, token);
            navigate("/")
        } catch (error) {
            setErrorMessage(error.message || "Email or username already in use.");
        }
    }

    return (
        <div className="register-page">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div className="emailField">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="usernameField">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="passwordField">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Sign Up</button>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <p className="toggle-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}