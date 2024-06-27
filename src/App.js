// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./component/AuthContext";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

// Protected Route Component
function PrivateRoute({ children }) {
    const { userLoggedin, loading } = useAuth();
    
    if (loading) return <div>Loading...</div>;
    
    return userLoggedin ? children : <Navigate to="/login" />;
}

export default App;
