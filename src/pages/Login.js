import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
const Login = () => {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    try {
        // 确保传递的是 contact 而不是 email
        const response = await axios.post('https://www.xfkenzify.com:5000/api/auth/login', { contact, password });
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        navigate('/');
    } catch (error) {
        setError('登录失败，请检查您的凭证');
    }
};


    return (
        <div style={styles.container}>
            <h2 style={styles.title}>登录</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="手机号/QQ号"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>登录</button>
            </form>
            <p>还没有账号？ <a href="/register" style={styles.link}>注册</a></p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#6200ee',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    link: {
        color: '#6200ee',
        textDecoration: 'none',
    }
};

export default Login;
