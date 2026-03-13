import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const { posts, isLoading, error, getPosts, createPost, deletePost } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // 检查用户是否已登录
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(title, content);
    setTitle('');
    setContent('');
  };

  const handleDelete = async (id: string) => {
    await deletePost(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">文章管理</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">发布新文章</h2>
          {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 mb-2">标题</label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 mb-2">内容</label>
              <textarea
                id="content"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? '发布中...' : '发布'}
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">文章列表</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>加载中...</p>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">暂无文章</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{post.title}</h3>
                      <p className="text-gray-600 mt-1">{post.content.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                        <span>{post.author.username}</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(post.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? '删除中...' : '删除'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;