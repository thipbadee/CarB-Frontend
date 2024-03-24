'use client'
import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate form data
        if (!username || !email || !password || !telephone || !userRole) {
            showMessage('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username, // Map frontend field to backend field
                    email: email, // Map frontend field to backend field
                    password: password, // Map frontend field to backend field
                    tel: telephone, // Map frontend field to backend field
                    role: userRole // Map frontend field to backend field
                })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            showMessage('Registration successful');
        } catch (error) {
            showMessage('Registration failed');
        }
    };

    const showMessage = (message: string) => {
        setMessage(message);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div>
                <input
                    type="tel"
                    placeholder="Telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
                </div>
                <div>
                <input
                    type="text"
                    placeholder="Role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                />
                </div>
                <button type="submit">Register</button>
            </form>
            <div>{message}</div>
        </div>
    );
};

export default RegistrationForm;
