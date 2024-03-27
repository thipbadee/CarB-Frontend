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
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
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

            alert('Registration successful');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="py-10 bg-rose-100 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-10 mb-4 flex flex-col items-center w-[400px]">
                <div className="text-2xl font-bold text-rose-400 text-center">Register for new user!</div>
                <div className="text-sm font-semibold text-rose-300 text-center mb-4">Please fill all fields</div>
                <div className="mb-4 w-full px-5 mt-2">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4 w-full px-5">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4 w-full px-5">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password (at least 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4 w-full px-5">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="tel"
                        placeholder="Telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </div>
                <div className="mb-4 w-full px-5">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Role (user or admin)"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                    />
                </div>
                <button type="submit" className="flex bg-rose-500 hover:bg-rose-700 text-white items-center font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
