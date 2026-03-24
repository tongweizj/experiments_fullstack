import React, { useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
    Navbar, Nav, Container, Row, Col, Card, Table,
    Button, Form, InputGroup, Dropdown, Modal, Badge, Pagination
} from 'react-bootstrap';
import './admin.css'
import { useAuth } from '../hooks/useAuth';

const AdminLayout = ({ children }) => {
    const { logout } = useAuth();
    const location = useLocation();
    let navigate = useNavigate();
    
    // 导航菜单配置
    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <i className="bi bi-speedometer2"></i> },
        { name: 'Students', path: '/admin/students', icon: <i className="bi bi-people"></i> },
        { name: 'Courses', path: '/admin/courses', icon: <i className="bi bi-journal-text"></i> },
        { name: 'AdminUsers', path: '/admin/users', icon: <i className="bi bi-journal-text"></i> },
    ];

    // 侧边栏折叠状态
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // 处理退出登录
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            logout();
        }
    };

    // 切换侧边栏
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // 检查当前路径是否激活
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* 顶部导航栏 */}
            <nav className="navbar navbar-top navbar-expand-lg">
                <div className="container-fluid">
                    {/* 品牌/标题 */}
                    <Link className="navbar-brand" to="/admin/dashboard">
                        <i className="bi bi-layers-half"></i> Student Enrollment System
                    </Link>

                    {/* 右侧导航项 */}
                    <div className="d-flex align-items-center">
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" id="userDropdown" className="text-white text-decoration-none d-flex align-items-center">
                                <i className="bi bi-person-circle fs-4 me-2"></i>
                                <span>Admin</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="#"><i className="bi bi-person me-2"></i> profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i> Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                      

                        {/* 移动端菜单切换按钮 */}
                        <button
                            className="btn btn-link text-white d-lg-none ms-2"
                            id="sidebarToggle"
                            onClick={toggleSidebar}
                        >
                            <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* 左侧导航栏 */}
            <div
                className={`sidebar ${sidebarCollapsed ? 'active' : ''}`}
                id="sidebar"
            >
                <div className="sidebar-heading">Admin</div>

                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span style={{ marginLeft: '0.75rem' }}>{item.name}</span>
                    </Link>
                ))}

            </div>

            {/* 主内容区域 */}
            <div
                className={`main-content ${sidebarCollapsed ? 'active' : ''}`}
                id="mainContent"
            >
                <Outlet />

                {/* 底部信息 */}
                <footer className="pt-3">
                    <div className="text-center text-muted small">
                        <p>© 2026 Student Management System. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default AdminLayout;
