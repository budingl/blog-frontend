import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PostContextType {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  getPosts: () => Promise<void>;
  getPost: (id: string) => Promise<void>;
  createPost: (title: string, content: string) => Promise<void>;
  updatePost: (id: string, title: string, content: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  // 缓存机制
  const [lastFetched, setLastFetched] = useState<number>(0);
  const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

  // 获取所有文章
  const getPosts = async () => {
    // 检查缓存是否有效
    if (Date.now() - lastFetched < CACHE_DURATION && posts.length > 0) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts');
      setPosts(res.data);
      setLastFetched(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || '获取文章失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 获取单个文章
  const getPost = async (id: string) => {
    // 检查当前文章是否已经加载且ID匹配
    if (currentPost && currentPost.id === id) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts/${id}`);
      setCurrentPost(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || '获取文章失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 创建文章
  const createPost = async (title: string, content: string) => {
    if (!token) {
      setError('请先登录');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post('${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts', { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts([res.data, ...posts]);
    } catch (err: any) {
      setError(err.response?.data?.message || '创建文章失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 更新文章
  const updatePost = async (id: string, title: string, content: string) => {
    if (!token) {
      setError('请先登录');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts/${id}`, { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.map(post => post.id === id ? res.data : post));
      setCurrentPost(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || '更新文章失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 删除文章
  const deletePost = async (id: string) => {
    if (!token) {
      setError('请先登录');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || '删除文章失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostContext.Provider value={{ posts, currentPost, isLoading, error, getPosts, getPost, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};