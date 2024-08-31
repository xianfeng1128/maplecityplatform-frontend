import React, { useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import Header from '../components/Header'; // 引入Header组件

const Viewer = () => {
    const viewerRef = useRef(null);

    useEffect(() => {
        const viewer = OpenSeadragon({
            id: "openseadragon1",
            prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
            tileSources: {
                Image: {
                    xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                    Url: "https://www.xfkenzify.com:8965/files/railoutput_files/",
                    Format: "jpg",
                    Overlap: "1",
                    TileSize: "256",
                    Size: {
                        Width: 11406,
                        Height: 8264
                    }
                },
                maxLevel: 14  // 设置为14，表示一共有15个层级（0到14）
            },
            showNavigator: true,
            toolbar: "toolbarDiv",
            zoomInButton: "zoom-in",
            zoomOutButton: "zoom-out",
            homeButton: "home",
            zoomPerScroll: 1.7,  // 设置更高的滚轮灵敏度
            animationTime: 1.0,  // 缩短动画时间
            springStiffness: 10.0,  // 增加弹性系数以减少回弹
            immediateRender: true,  // 提前渲染现有切片
        });

        // 清理函数，以防内存泄漏
        return () => {
            if (viewer) {
                viewer.destroy();
            }
        };
    }, []);

    return (
        <div style={styles.container}>
            <Header /> {/* 添加Header组件 */}
            <div id="openseadragon1" style={styles.viewer} ref={viewerRef}></div>
            
            <div id="toolbarDiv" style={styles.toolbar}>
                <button id="zoom-in" style={styles.button}>放大</button>
                <button id="zoom-out" style={styles.button}>缩小</button>
                <button id="home" style={styles.button}>复原</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    },
    viewer: {
        width: '100%',
        height: 'calc(100vh - 60px)', // 减去Header的高度
        marginTop: '60px', // Header的高度
    },
    toolbar: {
        position: 'fixed',  // 固定在页面上
        top: '70px',  // 距离页面顶部
        left: '20px',  // 距离页面左侧
        display: 'flex',
        flexDirection: 'column',  // 垂直排列按钮
        gap: '10px',  // 按钮之间的间距
        zIndex: 1002,  // 确保按钮位于其他内容的前面
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#6200ee',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.2s ease',
    },
    buttonHover: {
        backgroundColor: '#5200c6',
    }
};

export default Viewer;
