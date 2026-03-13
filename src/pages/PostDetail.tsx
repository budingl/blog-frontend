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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-8 mb-10 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-xl p-8 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (postError || !currentPost) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {postError || '文章不存在'}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <article className="bg-white shadow-lg rounded-xl p-8 mb-10 transform transition-all duration-300 hover:shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">{currentPost.title}</h1>
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mb-8 pb-4 border-b">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3">
                  {currentPost.author.username.charAt(0).toUpperCase()}
                </div>
                <span>作者: {currentPost.author.username}</span>
              </div>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {new Date(currentPost.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="mb-6">
              {currentPost.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mr-3 mb-2">
                  {currentPost.category.name}
                </span>
              )}
              {currentPost.tags && currentPost.tags.length > 0 && (
                currentPost.tags.map((tag) => (
                  <span key={tag.id} className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full mr-3 mb-2">
                    {tag.name}
                  </span>
                ))
              )}
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              {currentPost.content}
            </div>
          </article>
          
          <section className="bg-white shadow-lg rounded-xl p-8 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">评论 ({comments.length})</h2>
            {commentError && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 animate-fade-in">{commentError}</div>}
            
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div>
                  <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">发表评论</label>
                  <textarea
                    id="comment"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    rows={4}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={commentLoading}
                >
                  {commentLoading ? '提交中...' : '提交评论'}
                </button>
              </form>
            ) : (
              <p className="mb-8 text-gray-600">请先 <a href="/login" className="text-blue-600 hover:underline font-medium">登录</a> 后发表评论</p>
            )}
            
            {commentLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">暂无评论</p>
                <p className="text-gray-400 mt-2">成为第一个评论的人吧</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {comments.map((comment) => (
                  <li key={comment.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex flex-col md:flex-row justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3">
                            {comment.author.username.charAt(0).toUpperCase()}
                          </div>
                          <h4 className="font-bold text-gray-800">{comment.author.username}</h4>
                        </div>
                        <p className="text-gray-600 mb-3">{comment.content}</p>
                        <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                      </div>
                      {user && user.id === comment.author.id && (
                        <button
                          className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;