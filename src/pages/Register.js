import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState(''); // 用于手机号/QQ号
    const [password, setPassword] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://kkk.xfkenzify.com:5000/api/auth/register', {
                username,
                contact, // 将手机号/QQ号作为contact发送
                password
            });

            // 自动登录
            const loginResponse = await axios.post('https://www.xfkenzify.com:5000/api/auth/login', { contact, password });
            localStorage.setItem('userInfo', JSON.stringify(loginResponse.data));
            navigate('/');
        } catch (error) {
            setError('注册失败，请检查您的信息');
        }
    };

    const handleConfirmation = () => {
        setShowConfirmation(true);
    };

    const confirmRegistration = () => {
        setShowConfirmation(false);
        handleRegister();
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>请勿使用，正在调试</h2>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.form}>
                <input 
                    type="text" 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)} 
                    placeholder="手机号/QQ号" 
                    style={styles.input}
                />
                <p style={styles.tip}>该信息用于密码找回及登陆，请仔细填写</p> {/* 添加提示信息 */}
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="用户名" 
                    style={styles.input}
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="密码" 
                    style={styles.input}
                />
                <button onClick={handleConfirmation} style={styles.button}>注册</button>
            </div>
            <p>已经有账号？ <a href="/login" style={styles.link}>登录</a></p>

            {showConfirmation && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h3>请确认您的注册信息</h3>
                        <p>手机号/QQ号: {contact}</p>
                        <p>用户名: {username}</p>
                        <p>密码: {password}</p>
                        <p>请确认以上信息正确无误后点击“确认注册”按钮。</p>
                        <button onClick={confirmRegistration} style={styles.confirmButton}>确认注册</button>
                        <button onClick={() => setShowConfirmation(false)} style={styles.cancelButton}>取消</button>
                    </div>
                </div>
            )}
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
        marginBottom: '5px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    },
    tip: {
        marginBottom: '15px',
        fontSize: '12px',
        color: '#666',
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
    },
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '300px',
    },
    confirmButton: {
        padding: '10px',
        backgroundColor: '#6200ee',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '10px',
    },
    cancelButton: {
        padding: '10px',
        backgroundColor: '#ccc',
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    }
};

export default Register;
