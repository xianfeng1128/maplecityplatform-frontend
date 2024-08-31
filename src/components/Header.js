import React, { useState, useEffect } from 'react';
import './Header.css';
import MenuIcon from './assets/icons/menu-icon.svg'; // 导入 SVG 图标
import Logo from './assets/images/fcp5-02.png'; // 导入你的 logo 图片

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        // 获取存储在 localStorage 中的用户信息
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserInfo(user);
        }
    }, []);

    const handleLogout = () => {
        // 清除 localStorage 中的用户信息
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        window.location.href = '/'; // 重定向到主页
    };

    return (
        <header className="header">
            <div className="titleContainer">
                <img src={Logo} alt="Logo" className="logo" />
                <h1 className="title">
                    <a href="/" className="link">
                        枫城在线内容平台
                    </a>
                </h1>
            </div>
            <div className="buttonContainer">
                <button
                    className="button"
                    onClick={() => window.location.href = '/gallery-navigation'}
                >
                    地图查看
                </button>
                <button
                    className="button"
                    onClick={() => window.open('https://space.bilibili.com/397291840', '_blank')}
                >
                    联系作者
                </button>
                <button
                    className="button"
                    onClick={() => window.open('https://www.xfkenzify.com:442/', '_blank')}
                >
                    官方网站
                </button>
                <button
                    className="button"
                    onClick={() => window.location.href = '/update-log'}
                >
                    更新日志
                </button>
				
                {userInfo ? (
                    <>
                        <div
                            className="usernameContainer"
                            onMouseEnter={() => setShowLogout(true)}
                            onMouseLeave={() => setShowLogout(false)}
                        >
                            <button className="button">
                                {userInfo.username} 
                            </button>
                            {showLogout && (
                                <div className="logoutButton" onClick={() => setShowConfirmation(true)}>
                                    退出登录
                                </div>
                            )}
                        </div>
                        <button className="button" onClick={() => window.location.href = '/profile'}>
                            个人中心
                        </button>
						
                    </>
                ) : (
                    <>
                        <button
                            className="button"
                            onClick={() => window.location.href = '/login'}
                        >
                            登录
                        </button>
                        <button
                            className="button"
                            onClick={() => window.location.href = '/register'}
                        >
                            注册
                        </button>
                    </>
                )}
            </div>

            <div className="menuIcon" onClick={toggleMenu}>
                <img src={MenuIcon} alt="Menu" width="32" height="32" />
            </div>

            {menuOpen && (
                <div className="dropdownMenu">
                    <button
                        className="dropdownButton"
                        onClick={() => window.location.href = '/gallery-navigation'}
                    >
                        地图查看
                    </button>
                    <button
                        className="dropdownButton"
                        onClick={() => window.open('https://space.bilibili.com/397291840', '_blank')}
                    >
                        联系作者
                    </button>
                    <button
                        className="dropdownButton"
                        onClick={() => window.open('https://www.xfkenzify.com:442/', '_blank')}
                    >
                        官方网站
                    </button>
                    <button
                        className="dropdownButton"
                        onClick={() => window.location.href = '/update-log'}
                    >
                        更新日志
                    </button>
                    {userInfo ? (
                        <>
                            <button className="dropdownButton">
                                {userInfo.username}
                            </button>
                            <button className="dropdownButton" onClick={() => window.location.href = '/profile'}>
                                个人中心
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="dropdownButton"
                                onClick={() => window.location.href = '/login'}
                            >
                                登录
                            </button>
                            <button
                                className="dropdownButton"
                                onClick={() => window.location.href = '/register'}
                            >
                                注册
                            </button>
                        </>
                    )}
                </div>
            )}

            {showConfirmation && (
                <div className="modal">
                    <div className="modalContent">
                        <h3>确认退出登录</h3>
                        <p>您确定要退出登录吗？</p>
                        <button className="confirmButton" onClick={handleLogout}>确认</button>
                        <button className="cancelButton" onClick={() => setShowConfirmation(false)}>取消</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
