import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">关于我</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            你好，我是一名热爱技术的开发者，专注于前端和后端技术的学习与实践。
          </p>
          <p className="text-gray-700 mb-4">
            这个博客是我分享技术经验、学习心得和生活感悟的地方。希望通过这个平台，能够与更多志同道合的朋友交流和学习。
          </p>
          <p className="text-gray-700">
            如果你有任何问题或建议，欢迎随时联系我。
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;