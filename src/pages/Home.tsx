import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePosts } from '../context/PostContext';

const Home: React.FC = () => {
  const { posts, isLoading, error, getPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">最新文章</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>加载中...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p>暂无文章</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <a href={`/post/${post.id}`} className="block p-6">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.author.username}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;