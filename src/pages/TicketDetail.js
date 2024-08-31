import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [ticket, setTicket] = useState(null);
    const [reply, setReply] = useState('');
    const [status, setStatus] = useState('');
    const [latestReplyId, setLatestReplyId] = useState(null); // 用于存储最新回复的ID

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await axios.get(`https://www.xfkenzify.com:5000/tickets/${id}`);
                setTicket(res.data);
                setStatus(res.data.status);
                await axios.patch(`https://www.xfkenzify.com:5000/tickets/${id}/views`);
            } catch (error) {
                console.error('获取工单时出错:', error);
            }
        };
        fetchTicket();
    }, [id]);

    const handleReplySubmit = async () => {
        try {
            const res = await axios.post(`https://www.xfkenzify.com:5000/tickets/${id}/replies`, {
                reply,
                user: '用户',
            });
            setLatestReplyId(res.data.replies[res.data.replies.length - 1]._id); // 存储最新回复的ID
            setTicket(res.data);
            setReply('');
        } catch (error) {
            console.error('添加回复时出错:', error);
        }
    };

    const handleDeleteReply = async (replyId) => {
        try {
            await axios.delete(`https://www.xfkenzify.com:5000/tickets/${id}/replies/${replyId}`);
            const res = await axios.get(`https://www.xfkenzify.com:5000/tickets/${id}`);
            setTicket(res.data);
            if (replyId === latestReplyId) setLatestReplyId(null); // 如果删除的是最新回复，清空最新回复ID
        } catch (error) {
            console.error('删除回复时出错:', error);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板');
    };

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    const imageStyle = `
        img {
            max-width: 100%;
            height: auto;
        }
    `;

    const getStatusStyle = (status) => {
        switch (status) {
            case '已创建':
                return { backgroundColor: 'blue', color: 'white' };
            case '处理中':
                return { backgroundColor: 'yellow', color: 'black' };
            case '已完成':
                return { backgroundColor: 'green', color: 'white' };
            case '暂不修复':
                return { backgroundColor: 'red', color: 'white' };
            case '违规':
                return { backgroundColor: 'grey', color: 'white' };
            case '置顶':
                return { backgroundColor: 'purple', color: 'white' };
            default:
                return {};
        }
    };

    if (!ticket) {
        return <div>加载中...</div>;
    }

    const params = new URLSearchParams(location.search);
    const page = params.get('page') || 1;

    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.ticketDetail}>
                <h2 style={styles.heading}>{ticket.title}</h2>
                <div style={styles.ticketInfo}>
                    <p><strong>类别:</strong> {ticket.category}</p>
                    {ticket.category === '优化建议' && ticket.subCategory && (
                        <p><strong>具体类别:</strong> {`${ticket.category} - ${ticket.subCategory}`}</p>
                    )}
                    <p><strong>状态:</strong> <span style={getStatusStyle(ticket.status)}>{ticket.status}</span></p>
                    <p><strong>阅读数:</strong> {Math.floor(ticket.views / 2)}</p>
                    <p><strong>创建时间:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                    {ticket.category === '问题反馈' && ticket.coordinates && (
                        <p><strong>坐标:</strong> X: {ticket.coordinates.x} Y: {ticket.coordinates.y} Z: {ticket.coordinates.z}</p>
                    )}
                </div>
                <div style={styles.ticketContent}>
                    <style>{imageStyle}</style>
                    <div
                        dangerouslySetInnerHTML={{ __html: ticket.description }}
                    />
                </div>
                <div style={styles.replies}>
                    <h3>开发者回复</h3>
                    {ticket.replies.filter(reply => reply.user === '开发者').map((reply, index) => (
                        <div key={index} style={styles.developerReply}>
                            <strong>{reply.user}</strong>
                            <div dangerouslySetInnerHTML={{ __html: reply.message }} />
                            <p>{new Date(reply.timestamp).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div style={styles.replies}>
                    <h3>用户回复</h3>
                    {ticket.replies.filter(reply => reply.user === '用户').map((reply, index) => (
                        <div key={index} style={styles.userReply}>
                            <strong>{reply.user}</strong>
                            <p>{index + 1}楼</p>
                            <div dangerouslySetInnerHTML={{ __html: reply.message }} />
                            <p>{new Date(reply.timestamp).toLocaleString()}</p>
                            {reply._id === latestReplyId && (
                                <button onClick={() => handleDeleteReply(reply._id)} style={styles.deleteButton}>
                                    撤回
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <ReactQuill value={reply} onChange={setReply} modules={modules} style={styles.quillEditor} />
                    <button onClick={handleReplySubmit} style={{...styles.button, ...styles.submitButton}}>提交回复</button>
                </div>
                <div style={styles.buttonContainer}>
                    <button onClick={() => navigate(`/?page=${page}`)} style={{...styles.button, ...styles.greyButton}}>返回列表</button>
                    <button onClick={handleCopyLink} style={{...styles.button, ...styles.greyButton}}>复制链接</button>
                </div>
                <style>
                    {`
                        button:hover {
                            opacity: 0.8;
                        }
                    `}
                </style>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        paddingTop: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    ticketDetail: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        flex: '1',
    },
    heading: {
        textAlign: 'left',
    },
    ticketInfo: {
        padding: '20px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    ticketContent: {
        padding: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    replies: {
        margin: '20px 0',
    },
    developerReply: {
        padding: '10px',
        backgroundColor: '#e0f7fa',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    userReply: {
        padding: '10px',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
        marginBottom: '10px',
        position: 'relative', // 为了放置撤回按钮
    },
    deleteButton: {
        position: 'absolute',
        right: '10px',
        top: '10px',
        padding: '5px 10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    quillEditor: {
        backgroundColor: '#f9f9f9',
        color: '#000000',
        margin: '10px 0',
    },
    button: {
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'opacity 0.3s',
    },
    submitButton: {
        width: '100%',
        backgroundColor: '#6200ee',
        color: '#fff',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    greyButton: {
        flex: '1',
        margin: '0 10px',
        backgroundColor: '#888888',
        color: '#fff',
    },
};

export default TicketDetail;
