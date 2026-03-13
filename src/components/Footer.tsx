import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">个人博客</h2>
            <p className="text-gray-400 mt-2">分享技术与生活</p>
          </div>
          <div className="text-gray-400">
            <p>© {new Date().getFullYear()} 个人博客. 保留所有权利.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;