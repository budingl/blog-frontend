import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  post: string;
  createdAt: string;
}

interface CommentContextType {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  getComments: (postId: string) => Promise<void>;
  createComment: (content: string, postId: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  // 缓存机制
  const [lastFetched, setLastFetched] = useState<number>(0);
  const [currentPostId, setCurrentPostId] = useState<string>('');
  const CACHE_DURATION = 2 * 60 * 1000; // 2分钟缓存

  // 获取文章的评论
  const getComments = async (postId: string) => {
    // 检查缓存是否有效且文章ID匹配
    if (Date.now() - lastFetched < CACHE_DURATION && currentPostId === postId && comments.length > 0) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/comments/post/${postId}`);
      setComments(res.data);
      setCurrentPostId(postId);
      setLastFetched(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || '获取评论失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 创建评论
  const createComment = async (content: string, postId: string) => {
    if (!token) {
      setError('请先登录');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post('${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/comments', { content, post: postId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments([res.data, ...comments]);
    } catch (err: any) {
      setError(err.response?.data?.message || '创建评论失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 删除评论
  const deleteComment = async (id: string) => {
    if (!token) {
      setError('请先登录');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(comments.filter(comment => comment.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || '删除评论失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommentContext.Provider value={{ comments, isLoading, error, getComments, createComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};