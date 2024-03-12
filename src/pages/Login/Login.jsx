import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
    const navigate = useNavigate();
    // State to manage username and password inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add your authentication logic here (e.g., API call)
        console.log("Email:", email);
        console.log("Password:", password);
        try {
            const result = await login(email, password);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }

        // Reset form fields after submission (optional)
        setEmail("");
        setPassword("");
    };

    return (
        <div className="Page Login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Signup Here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
