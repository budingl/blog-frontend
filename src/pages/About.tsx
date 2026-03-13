import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">关于我</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">你好，我是一名热爱技术的开发者</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                我专注于前端和后端技术的学习与实践，热爱探索新技术和解决复杂问题。通过不断学习和实践，我希望能够在技术领域不断成长和进步。
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                这个博客是我分享技术经验、学习心得和生活感悟的地方。我希望通过这个平台，能够与更多志同道合的朋友交流和学习，共同成长。
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                如果你有任何问题或建议，欢迎随时联系我。我期待与你交流和分享！
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-50 p-4 rounded-lg flex-1 min-w-[200px]">
                  <h3 className="font-semibold text-gray-800 mb-2">技术栈</h3>
                  <p className="text-gray-600">React, TypeScript, Spring Boot, PostgreSQL</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex-1 min-w-[200px]">
                  <h3 className="font-semibold text-gray-800 mb-2">兴趣爱好</h3>
                  <p className="text-gray-600">编程, 阅读, 旅行, 音乐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;