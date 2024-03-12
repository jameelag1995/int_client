// Registration.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Registration = () => {
    const navigate = useNavigate();
    // State to manage registration form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useAuth();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add your registration logic here (e.g., API call)
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        const result = await register({ username: name, email, password });
        if (result.status === 201) navigate("/home");
        console.log(result);
        // Reset form fields after submission (optional)
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="Page Login">
            <form onSubmit={handleSubmit}>
                <h2>SignUp</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                    <button type="submit">Register</button>
                </div>
                <p>
                    Already have an account? <Link to="/">Login Here</Link>
                </p>
            </form>
        </div>
    );
};

export default Registration;
