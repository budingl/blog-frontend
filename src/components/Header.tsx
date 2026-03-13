import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          个人博客
        </Link>
        
        {/* 移动端菜单按钮 */}
        <button 
          className="md:hidden text-white focus:outline-none transition-transform duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
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
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-white hover:text-blue-400 transition-colors duration-300 relative group">
                首页
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-400 transition-colors duration-300 relative group">
                关于
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/admin" className="text-white hover:text-blue-400 transition-colors duration-300 relative group">
                    管理
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="text-white hover:text-blue-400 transition-colors duration-300 relative group"
                  >
                    注销
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-blue-400 transition-colors duration-300 relative group">
                    登录
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
                    注册
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-gray-900 py-4 px-4 shadow-lg animate-fadeIn">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/" className="block text-white hover:text-blue-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                  首页
                </Link>
              </li>
              <li>
                <Link to="/about" className="block text-white hover:text-blue-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                  关于
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/admin" className="block text-white hover:text-blue-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                      管理
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left text-white hover:text-blue-400 transition-colors duration-300 py-2"
                    >
                      注销
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="block text-white hover:text-blue-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                      登录
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 text-center" onClick={() => setIsMenuOpen(false)}>
                      注册
                    </Link>
                  </li>
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