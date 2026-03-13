import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { user } = useAuth();
  const { posts, categories, tags, isLoading, error, getPosts, getCategories, getTags, createPost, deletePost } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
    getCategories();
    getTags();
  }, [getPosts, getCategories, getTags]);

  // 检查用户是否已登录
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(title, content, selectedCategory, selectedTags);
    setTitle('');
    setContent('');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  const handleDelete = async (id: string) => {
    await deletePost(id);
  };

  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            文章管理
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            管理您的博客文章，发布新内容，删除不需要的文章
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">发布新文章</h2>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 animate-fade-in">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">标题</label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">内容</label>
              <textarea
                id="content"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">分类</label>
              <select
                id="category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">请选择分类</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">标签</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`tag-${tag.id}`} className="text-gray-700">
                      {tag.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? '发布中...' : '发布'}
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">文章列表</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">暂无文章</p>
              <p className="text-gray-400 mt-2">开始发布您的第一篇文章吧</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.id} className="border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="flex-1 mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{post.title}</h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">{post.content.substring(0, 150)}...</p>
                      {post.category && (
                        <div className="mt-2">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {post.category.name}
                          </span>
                        </div>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span key={tag.id} className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mt-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          {post.author.username}
                        </span>
                        <span className="flex items-center mt-2 md:mt-0">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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