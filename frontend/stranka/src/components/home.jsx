import { useState, useEffect } from "react";

import "./home.css";

export default function Home() {
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        try {
            const res = await fetch("http://localhost:8080/api/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="home-container">      
            {(users.length > 0 || error) && (
            <div className="users-wrapper">
                {error && <div className="error">{error}</div>}
                {users.map(user => (
                    <li key={user.id}><div className="user-row">{user.name} ({user.email})</div></li>
                ))}
            </div>
            )}
        </div>
    );
}