import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GalleryNavigation = () => {
    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.content}>
                <h1 style={styles.title}>枫城城市地图</h1>
                <div style={styles.items}>
                    <div style={styles.item}>
                        <a href="https://www.xfkenzify.com:3002/dziview" style={styles.link}>
                            <h2 style={styles.itemTitle}>轨道交通配线图</h2>
                            <img src="https://www.xfkenzify.com:8965/files/pic01.png" alt="Gallery 1" style={styles.image} />
                        </a>
                    </div>
                    <div style={styles.item}>
                        <a href="https://www.xfkenzify.com:442/mywebsite/unmined.index.html" style={styles.link}>
                            <h2 style={styles.itemTitle}>城市在线卫星图</h2>
                            <img src="https://www.xfkenzify.com:8965/files/pic02.png" alt="Gallery 2" style={styles.image} />
                        </a>
                    </div>
                    <div style={styles.item}>
                        <a href="https://www.xfkenzify.com:3002/viewmap" style={styles.link}>
                            <h2 style={styles.itemTitle}>轨道交通线网图</h2>
                            <img src="https://www.xfkenzify.com:8965/files/pic03.png" alt="Gallery 3" style={styles.image} />
                        </a>
                    </div>
                </div>
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        flex: '1',
        textAlign: 'center',
    },
    title: {
        fontSize: '36px',
        marginBottom: '40px',
    },
    items: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
    },
    item: {
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    itemTitle: {
        fontSize: '24px',
        margin: '16px 0',
        textDecoration: 'none',
        color: '#6200ee',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: '200px',  // 限制图片的最大高度
        objectFit: 'cover',  // 保持图片的宽高比，同时填满容器
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
};

export default GalleryNavigation;
