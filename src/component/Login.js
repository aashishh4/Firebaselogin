// Login.js

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "./auth1";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const { userLoggedin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setSigningIn(true);
            setErrorMessage(''); // Clear previous errors
            try {
                await doSignInWithEmailAndPassword(email, password);
                setEmail(''); // Clear email field after successful login
                setPassword(''); // Clear password field after successful login
                navigate('/'); // Navigate to Home after login
            } catch (error) {
                setErrorMessage(error.message); // Display the error message
            } finally {
                setSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setSigningIn(true);
            setErrorMessage(''); // Clear previous errors
            try {
                await doSignInWithGoogle();
                navigate('/'); // Navigate to Home after login
            } catch (error) {
                setErrorMessage(error.message); // Display the error message
            } finally {
                setSigningIn(false);
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
                    <button type="submit" disabled={isSigningIn}>
                        {isSigningIn ? 'Signing in...' : 'Sign In'}
                    </button>
                    <button onClick={onGoogleSignIn} disabled={isSigningIn}>
                        {isSigningIn ? 'Signing in...' : 'Sign In with Google'}
                    </button>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </form>
            )}
        </div>
    );
}

export default Login;
