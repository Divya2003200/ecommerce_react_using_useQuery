import React, { useContext, useState } from 'react';
import { GlobalContext } from './GloablState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('Login must be used within a GlobalProvider');
    }

    const { dispatch } = context;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/users');
            const users = response.data;

            if (username === 'admin' && password === 'admin') {
                dispatch({ type: 'LOGIN', payload: { role: 'admin', username: 'admin' } });
                alert('Logged in as admin');
                navigate('/admin');
                return;
            }

            const user = users.find((user: any) => user.username === username && user.password === password);

            if (user) {
                dispatch({ type: 'LOGIN', payload: { role: 'user', username } });
                alert('Logged in as user');
                navigate('/home');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
