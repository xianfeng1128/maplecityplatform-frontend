import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTickets from './pages/AllTickets';
import TicketDetail from './pages/TicketDetail';
import NewTicket from './pages/NewTicket';
import UpdateLog from './pages/UpdateLog';
import Viewer from './pages/Viewer';
import GalleryNavigation from './pages/GalleryNavigation'; 
import Viewmap from './pages/Viewmap'; 
import Register from './pages/Register';  // 导入注册页面
import Login from './pages/Login';  // 导入登录页面
import UserCenter from './pages/UserCenter';  // 导入用户中心页面

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AllTickets />} />
                <Route path="/tickets/:id" element={<TicketDetail />} />
                <Route path="/new-ticket" element={<NewTicket />} />
                <Route path="/update-log" element={<UpdateLog />} />
                <Route path="/dziview" element={<Viewer />} />
                <Route path="/gallery-navigation" element={<GalleryNavigation />} /> 
                <Route path="/viewmap" element={<Viewmap />} />
                <Route path="/register" element={<Register />} /> {/* 注册页面 */}
                <Route path="/login" element={<Login />} /> {/* 登录页面 */}
                <Route path="/user-center" element={<UserCenter />} /> {/* 用户中心页面 */}
            </Routes>
        </Router>
    );
}

export default App;
