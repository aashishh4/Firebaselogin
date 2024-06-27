// Register.js

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { doCreateUserWithEmailAndPassword } from "./auth1";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const { userLoggedin } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningUp, setSigningUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningUp) {
            setSigningUp(true);
            setErrorMessage(''); // Clear previous errors
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                setName('');
                setPhone('');
                setEmail('');
                setPassword('');
                navigate('/'); // Navigate to Home after registration
            } catch (error) {
                setErrorMessage(error.message); // Display the error message
            } finally {
                setSigningUp(false);
            }
        }
    };

    return (
        <div>
            {userLoggedin ? (
                <p>You are already logged in!</p>
            ) : (
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button type="submit" disabled={isSigningUp}>
                        {isSigningUp ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <p>I have an account? <Link to="/Login">Login</Link></p>

                </form>
            )}
        </div>
    );
}

export default Register;
