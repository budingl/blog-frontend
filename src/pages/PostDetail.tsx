import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePosts } from '../context/PostContext';
import { useComments } from '../context/CommentContext';
import { useAuth } from '../context/AuthContext';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [commentContent, setCommentContent] = useState('');
  const { currentPost, isLoading: postLoading, error: postError, getPost } = usePosts();
  const { comments, isLoading: commentLoading, error: commentError, getComments, createComment, deleteComment } = useComments();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getPost(id);
      getComments(id);
    }
  }, [id, getPost, getComments]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await createComment(commentContent, id);
      setCommentContent('');
    }
  };

  if (postLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p>加载中...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (postError || !currentPost) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-700 p-4 rounded">
            {postError || '文章不存在'}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <span>作者: {currentPost.author.username}</span>
            <span>{new Date(currentPost.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <p className="text-gray-700">{currentPost.content}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">评论 ({comments.length})</h2>
            {commentError && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{commentError}</div>}
            
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-700 mb-2">发表评论</label>
                  <textarea
                    id="comment"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    rows={3}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={commentLoading}
                >
                  {commentLoading ? '提交中...' : '提交评论'}
                </button>
              </form>
            ) : (
              <p className="mb-6">请先 <a href="/login" className="text-blue-500 hover:underline">登录</a> 后发表评论</p>
            )}
            
            {commentLoading ? (
              <div className="flex justify-center items-center h-32">
                <p>加载评论中...</p>
              </div>
            ) : comments.length === 0 ? (
              <p className="text-gray-500">暂无评论</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{comment.author.username}</h4>
                        <p className="text-gray-600 mt-2">{comment.content}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</p>
                      </div>
                      {user && user.id === comment.author.id && (
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => deleteComment(comment.id)}
                        >
                          删除
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;