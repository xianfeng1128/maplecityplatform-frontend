// src/pages/UpdateLog.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UpdateLog = () => {
    const updates = [
		{ date: '2024/08/29 02:31', version: 'V2.01.3', content: '全新升级至“数智枫城”平台，添加了地图查看引导界面' },
		{ date: '2024/08/27 21:00', version: 'V1.165.2', content: '添加了工单图标，提升外观呈现' },
		{ date: '2024/08/27 19:57', version: 'V1.160.1', content: '添加了按阅读数目排序功能' },
		{ date: '2024/08/26 13:23', version: 'V1.150.2', content: '改进了新工单创建的流程，提升用户创建体验' },
		{ date: '2024/08/25 15:01', version: 'V1.140.3', content: '优化了身份验证逻辑，提升了小屏幕下的操作体验' },
		{ date: '2024/08/18 13:16', version: 'V1.135.1', content: '优化了查看界面的进度保持功能' },
		{ date: '2024/08/18 12:39', version: 'V1.130.1', content: '添加了用户端的评论撤回功能' },
		{ date: '2024/08/13 17:13', version: 'EV1.120.11', content: '升级系统组件，修复了数据库路径丢失隐患' },
		{ date: '2024/08/13 12:53', version: 'V1.110.5', content: '修复了由于工单数量过多导致手机版错乱的问题' },
		{ date: '2024/08/10 14:22', version: 'V1.100.1', content: '优化了新工单创建时的提示及类别选择内容' },
		{ date: '2024/08/10 12:14', version: 'V1.93.2', content: '修复了富文本编辑器中手动图片上传失败的问题' },
		{ date: '2024/08/09 21:34', version: 'V1.90.1', content: '添加了工单优化建议中的子类别' },
		{ date: '2024/08/09 20:35', version: 'EV1.80.9', content: '紧急修复由于服务器掉电导致数据库丢失' },
		{ date: '2024/08/06 18:14', version: 'V1.70.2', content: '添加了工单细节页面中的“区分”和“混合”展示切换键' },
		{ date: '2024/08/05 13:32', version: 'V1.68.1', content: '将工单列表筛选框显示对应数量' },
		{ date: '2024/08/05 11:54', version: 'V1.63.0', content: '添加了页脚链接及“你知道吗”' },
		{ date: '2024/08/05 11:44', version: 'V1.63.0', content: '进行枫城聊天室功能测试（已停用）' },
		{ date: '2024/08/05 11:28', version: 'V1.60.5', content: '添加了阅读数统计功能' },
        { date: '2024/08/05 10:30', version: 'V1.50.0', content: '公开展示了更新日志，修改了网站标题' },
        { date: '2024/08/04 21:03', version: 'V1.45.1', content: '添加了“置顶”及“违规”两种状态' },
        { date: '2024/08/04 20:35', version: 'V1.40.4', content: '将工单列表添加正序倒序切换功能' },
        { date: '2024/08/04 15:14', version: 'V1.30.2', content: '为用户及开发者端提供了各自权限范围内的删除类功能' },
        { date: '2024/08/04 14:51', version: 'V1.20.1', content: '对UI的页眉、窗格细节、按键反馈、内容布局优化' },
        { date: '2024/08/04 14:31', version: 'V1.15.3', content: '添加工单时间戳记录' },
        { date: '2024/08/04 13:59', version: 'V1.10.0', content: '为开发端提供了状态更新功能' },
        { date: '2024/08/04 13:40', version: 'V1.00.1', content: '工单系统初步添加UI。' },
        { date: '2024/08/04 12:55', version: 'V0.45.3', content: '为富文本编辑器添加图片上传功能。' },
        { date: '2024/08/04 11:12', version: 'V0.40.1', content: '区分了用户回复和开发者回复，添加了富文本编辑器支持。' },
        { date: '2024/08/04 09:34', version: 'V0.30.2', content: '添加了工单状态及类别模块。' },
        { date: '2024/08/04 02:13', version: 'V0.21.1', content: '添加了SSL支持。' },
        { date: '2024/08/03 23:45', version: 'V0.10.0', content: '工单系统初步上线试运行。' },
    ];

    const [isDescending, setIsDescending] = useState(true);

    const handleSortChange = () => {
        setIsDescending(!isDescending);
    };

    const sortedUpdates = updates.sort((a, b) => {
        return isDescending ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
    });

    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.content}>
                <h1 style={styles.heading}>更新日志</h1>
                <button onClick={handleSortChange} style={styles.sortButton}>
                    {isDescending ? '倒序' : '正序'}
                </button>
                <ul style={styles.updateList}>
                    {sortedUpdates.map((update, index) => (
                        <li key={index} style={index === 0 ? styles.latestUpdateItem : styles.updateItem}>
                            <span style={styles.updateDate}>{update.date}</span>
                            <span style={styles.updateVersion}>{update.version}</span>
                            <span style={styles.updateContent}>{update.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer /> {/* 添加 Footer 组件 */}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        paddingTop: '60px', // 为冻结的页眉留出空间
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        flex: '1',
    },
    heading: {
        textAlign: 'left',
    },
    sortButton: {
        padding: '10px',
        marginBottom: '20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#d3d3d3',
        color: '#000',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    },
    sortButtonHover: {
        backgroundColor: '#b0b0b0',
        color: '#000',
    },
    sortButtonActive: {
        backgroundColor: '#a0a0a0',
        color: '#000',
    },
    updateList: {
        listStyleType: 'none',
        padding: 0,
    },
    updateItem: {
        padding: '10px',
        marginBottom: '10px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
    },
    latestUpdateItem: {
        padding: '10px',
        marginBottom: '10px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f8ff',
        borderLeft: '5px solid #6200ee',
    },
    updateDate: {
        fontWeight: 'bold',
    },
    updateVersion: {
        color: '#666',
        marginBottom: '5px',
    },
    updateContent: {
        marginTop: '5px',
    }
};

export default UpdateLog;
