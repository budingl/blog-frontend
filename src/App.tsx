import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { CommentProvider } from './context/CommentContext';

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PostDetail = lazy(() => import('./pages/PostDetail'));

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <CommentProvider>
          <Router>
            <Suspense fallback={<div className="flex justify-center items-center h-screen">加载中...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/:id" element={<PostDetail />} />
              </Routes>
            </Suspense>
          </Router>
        </CommentProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
