import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  Navbar, Nav, Container, Row, Col, Card, Table,
  Button, Form, InputGroup, Dropdown, Modal, Badge, Pagination
} from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

const MainLayout = ({ children }) => {
  const { authname, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  // 导航菜单配置
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <i className="bi bi-speedometer2"></i> },
    { name: 'Courses', path: '/courses', icon: <i className="bi bi-journal-text"></i> },
  ];

  // 侧边栏折叠状态
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      {/* 顶部导航栏 - 现在是 sticky */}
      <nav className="navbar navbar-top navbar-expand-lg sticky-top">
        <div className="container-fluid">
          {/* 品牌/标题 */}
          <Link className="navbar-brand" to="/">
            <i className="bi bi-layers-half"></i> Student Enrollment System
          </Link>

          {/* 右侧导航项 */}
          <div className="d-flex align-items-center text-white">
          
            {authname ? (
              <>
                <span className="me-3 text-white-50 small">Hello, {authname}</span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <div className="d-flex">
                <Nav.Link as={Link} to="/auth/signup" className="me-3 text-white">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/auth/login" className="text-white">Login</Nav.Link>
              </div>
            )}

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
        <div className="sidebar-heading">Student</div>

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
        <div className="container-fluid pt-4">
          <Outlet />
        </div>

        {/* 底部信息 */}
        <footer className="pt-3">
          <div className="text-center text-muted small">
            <p>© 2026 Student Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainLayout;
