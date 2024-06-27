// Home.js

import React from "react";
import { useAuth } from "./AuthContext";

function Home() {
    const { currentUser, logout } = useAuth();
    
    return (
        <div>
            <h1>Welcome {currentUser?.email}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;
