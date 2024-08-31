import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 10; // 每页显示的工单数量

function AllTickets() {
    const [topTickets, setTopTickets] = useState([]); // 置顶工单
    const [tickets, setTickets] = useState([]); // 普通工单
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortMode, setSortMode] = useState('desc'); // 默认为时间倒序
    const [jumpPage, setJumpPage] = useState(''); // 用于跳转到指定页

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        const category = params.get('category') || '';
        const status = params.get('status') || '';
        const sort = params.get('sort') || 'desc';

        setCurrentPage(page);
        setSelectedCategory(category);
        setSelectedStatus(status);
        setSortMode(sort);

        fetchTickets(page, category, status, sort);
    }, [location.search]);

    const fetchTickets = (page = currentPage, category = selectedCategory, status = selectedStatus, sort = sortMode) => {
        const sortBy = sort === 'views' ? 'views' : 'createdAt';
        const sortOrder = sort === 'asc' ? 'asc' : 'desc';

        axios.get('https://www.xfkenzify.com:5000/tickets', {
            params: {
                page,
                limit: ITEMS_PER_PAGE,
                sort: sortOrder,
                category,
                status,
                sortBy,
            }
        })
        .then(response => {
            const { topTickets, tickets, totalPages, categories, statuses } = response.data;
            setTopTickets(topTickets || []);
            setTickets(tickets || []);
            setTotalPages(totalPages);
            setCategories(categories || []);
            setStatuses(statuses || []);
        })
        .catch(error => {
            console.error('获取工单时出错:', error);
        });
    };

    const handleNewTicket = () => {
        navigate('/new-ticket');
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
        updateURLParams(1, e.target.value, selectedStatus, sortMode);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1);
        updateURLParams(1, selectedCategory, e.target.value, sortMode);
    };

    const handleSortToggle = () => {
        let newSortMode;

        if (sortMode === 'desc') {
            newSortMode = 'asc';
        } else if (sortMode === 'asc') {
            newSortMode = 'views';
        } else {
            newSortMode = 'desc';
        }

        setSortMode(newSortMode);
        updateURLParams(1, selectedCategory, selectedStatus, newSortMode);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        updateURLParams(page, selectedCategory, selectedStatus, sortMode);
    };

    const handleJumpToPage = () => {
        const page = parseInt(jumpPage, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            handlePageChange(page);
        }
    };

    const updateURLParams = (page, category, status, sort) => {
        const params = new URLSearchParams();
        params.set('page', page);
        if (category) params.set('category', category);
        if (status) params.set('status', status);
        params.set('sort', sort);

        navigate(`?${params.toString()}`);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        const hours = (`0${d.getHours()}`).slice(-2);
        const minutes = (`0${d.getMinutes()}`).slice(-2);
        return `${month}-${day} ${hours}:${minutes}`;
    };

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
                return { backgroundColor: 'purple', color: 'white', fontWeight: 'bold' };
            default:
                return {};
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxPageButtons = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    style={styles.pageButton}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="ellipsis-start">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={i === currentPage ? styles.activePageButton : styles.pageButton}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="ellipsis-end">...</span>);
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    style={styles.pageButton}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.content}>
                <h1 style={styles.heading}>反馈工单</h1>
                <p style={styles.introText}>
                    欢迎使用枫城城市问题反馈系统。在这里，您可以将地图中的问题反馈和其他意见等内容制作为工单，开发者会根据工单逐个修复。您可以点击“创建新工单”来发表反馈，也可以选择查看和评论其他玩家发布的工单。请注意不要发送与本版块无关内容，您的IP可能会被封禁导致您无法正常交互。
                </p>
                <button onClick={handleNewTicket} style={styles.newTicketButton}>创建新工单</button>
                <div style={styles.filters}>
                    <select value={selectedCategory} onChange={handleCategoryChange} style={styles.filterSelect}>
                        <option value="">所有类别</option>
                        {categories.map(({ category, count }) => (
                            <option key={category} value={category}>{category} ({count})</option>
                        ))}
                    </select>
                    <select value={selectedStatus} onChange={handleStatusChange} style={styles.filterSelect}>
                        <option value="">所有状态</option>
                        {statuses.map(({ status, count }) => (
                            <option key={status} value={status}>{status} ({count})</option>
                        ))}
                    </select>
                    <button onClick={handleSortToggle} style={styles.sortButton}>
                        {sortMode === 'desc' ? '时间倒序' : sortMode === 'asc' ? '时间顺序' : '阅读数'}
                    </button>
                </div>
                <ul style={styles.ticketList}>
                    {topTickets.map(ticket => (
                        <li key={ticket._id} style={styles.ticketItem}>
                            <Link to={`/tickets/${ticket._id}`} style={styles.ticketLink}>
                                <span style={{ ...styles.ticketTitle, fontWeight: 'bold' }}>{ticket.title}</span>
                                <span style={styles.ticketDate}>{formatDate(ticket.createdAt)}</span>
                                <span style={{ ...styles.ticketStatus, ...getStatusStyle(ticket.status) }}>{ticket.status}</span>
                            </Link>
                        </li>
                    ))}
                    {tickets.map(ticket => (
                        <li key={ticket._id} style={styles.ticketItem}>
                            <Link to={`/tickets/${ticket._id}`} style={styles.ticketLink}>
                                <span style={styles.ticketTitle}>{ticket.title}</span>
                                <span style={styles.ticketDate}>{formatDate(ticket.createdAt)}</span>
                                <span style={{ ...styles.ticketStatus, ...getStatusStyle(ticket.status) }}>{ticket.status}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div style={styles.pagination}>
                    {renderPagination()}
                </div>
                <div style={styles.jumpToPageContainer}>
                    <input
                        type="number"
                        value={jumpPage}
                        onChange={(e) => setJumpPage(e.target.value)}
                        placeholder="跳转到页码"
                        style={styles.jumpInput}
                    />
                    <button onClick={handleJumpToPage} style={styles.jumpButton}>跳转</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        paddingTop: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    content: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        flex: '1'
    },
    heading: {
        textAlign: 'left',
    },
    introText: {
        marginBottom: '20px',
        fontSize: '16px',
        color: '#333',
    },
    newTicketButton: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#6200ee',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
    filters: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
    },
    filterSelect: {
        flex: '1',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    sortButton: {
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#d3d3d3',
        color: '#000',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    },
    ticketList: {
        listStyleType: 'none',
        padding: 0,
    },
    ticketItem: {
        padding: '10px',
        marginBottom: '10px',
        borderBottom: '1px solid #ccc',
    },
    ticketLink: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ticketTitle: {
        flex: '3',
    },
    ticketDate: {
        flex: '2',
        textAlign: 'right',
        marginRight: '10px',
        color: '#666',
    },
    ticketStatus: {
        flex: '1',
        padding: '5px',
        borderRadius: '4px',
        textAlign: 'center',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    pageButton: {
        padding: '8px 12px',
        margin: '0 5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    activePageButton: {
        padding: '8px 12px',
        margin: '0 5px',
        border: '1px solid #6200ee',
        borderRadius: '4px',
        backgroundColor: '#6200ee',
        color: '#fff',
        cursor: 'pointer',
    },
    jumpToPageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    jumpInput: {
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '60px',
    },
    jumpButton: {
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#6200ee',
        color: '#fff',
        cursor: 'pointer',
    }
};

export default AllTickets;
