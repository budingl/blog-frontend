import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">个人博客</Link>
        
        {/* 移动端菜单按钮 */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* 桌面端导航 */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-300">首页</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">关于</Link></li>
            {user ? (
              <>
                <li><Link to="/admin" className="hover:text-gray-300">管理</Link></li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="hover:text-gray-300"
                  >
                    注销
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-gray-300">登录</Link></li>
                <li><Link to="/register" className="hover:text-gray-300">注册</Link></li>
              </>
            )}
          </ul>
        </nav>
        
        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 py-4 px-4">
            <ul className="flex flex-col space-y-4">
              <li><Link to="/" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>首页</Link></li>
              <li><Link to="/about" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>关于</Link></li>
              {user ? (
                <>
                  <li><Link to="/admin" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>管理</Link></li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left hover:text-gray-300"
                    >
                      注销
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>登录</Link></li>
                  <li><Link to="/register" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>注册</Link></li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;