import { loginUser } from "../api/userApi";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "../styles/pageStyles/Login.css"

export default function Login() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = { email, password };
            const response = await loginUser(credentials);
            const userInfo = response.user;
            const token = response.token;

            login(userInfo, token);
            navigate("/");
        } catch (error) {
            const msg = "Incorrect email or password.";
            setErrorMessage(msg);
        }
    };

    return (
        <div className="login-page">
            <form className="loginForm" onSubmit={handleSubmit}>
                <h2>Login</h2>
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

                <button type="submit">Login</button>

                {errorMessage && <p className="error">{errorMessage}</p>}
                <p className="toggle-link">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}
