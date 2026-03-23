'use client';

import { useState, useEffect } from 'react';
import { Users, MessageCircle, Lightbulb, GraduationCap, Plus, Send, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getPosts, createPost, getComments, createComment, Post, Comment } from '@/lib/api';
import { useAuth } from '@/components/AuthContext';

export default function CommunityPage() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  async function loadComments(postId: number) {
    if (selectedPost === postId) {
      setSelectedPost(null);
      return;
    }
    setSelectedPost(postId);
    if (!comments[postId]) {
      const c = await getComments(postId).catch(() => []);
      setComments((prev) => ({ ...prev, [postId]: c }));
    }
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    setSubmitting(true);
    try {
      const created = await createPost(newPostTitle, newPostContent);
      setPosts((prev) => [created, ...prev]);
      setNewPostTitle('');
      setNewPostContent('');
      setShowForm(false);
    } catch {
      // silent fail — user needs to be authenticated
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAddComment(postId: number) {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const c = await createComment(postId, newComment);
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] ?? []), c],
      }));
      setNewComment('');
    } catch {
      // silent fail
    } finally {
      setSubmitting(false);
    }
  }

  const groups = [
    { icon: <GraduationCap size={24} />, name: 'სტუდენტები', description: 'ბაკალავრიატისა და მაგისტრატურის სტუდენტების ჯგუფი.' },
    { icon: <Lightbulb size={24} />,     name: 'ახალგაზრდა მკვლევრები', description: 'დოქტორანტები და პოსტ-დოქტორანტები.' },
    { icon: <Users size={24} />,         name: 'მენტორები', description: 'გამოცდილი მეცნიერები, რომლებიც სტუდენტებს ეხმარებიან.' },
    { icon: <MessageCircle size={24} />, name: 'მასწავლებლები', description: 'სკოლისა და უნივერსიტეტის პედაგოგები.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="academic-title">
        ქსელი &amp; ფორუმი
      </h1>
      <p className="text-lg text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
        შეუერთდი სამეცნიერო თემას, გაუზიარე გამოცდილება და იპოვე მენტორი.
      </p>

      {/* Groups */}
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">ჯგუფები</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
        {groups.map((g, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-400 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                {g.icon}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white">{g.name}</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{g.description}</p>
          </div>
        ))}
      </div>

      {/* Posts / Discussions */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">დისკუსიები</h2>
        {isAuthenticated && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} /> ახალი თემა
          </button>
        )}
      </div>

      {/* New Post Form */}
      {showForm && isAuthenticated && (
        <form onSubmit={handleCreatePost} className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-6 space-y-4">
          <input
            type="text"
            placeholder="სათაური..."
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-400"
          />
          <textarea
            placeholder="თქვენი კითხვა ან გამოცდილება..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={4}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-400 resize-none"
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              გაუქმება
            </button>
            <button type="submit" disabled={submitting} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50">
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} გამოქვეყნება
            </button>
          </div>
        </form>
      )}

      {/* Post List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={32} className="animate-spin text-blue-500" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
          <p>ჯერ დისკუსია არ არის. იყავი პირველი!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => loadComments(post.id)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white hover:text-blue-500 transition-colors">{post.title}</h3>
                  <span className="text-xs text-slate-400 mt-1">
                    ავტორი: {post.author_username} · {new Date(post.created_at).toLocaleDateString('ka-GE')}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <MessageCircle size={14} />{post.comment_count}
                  </span>
                  {selectedPost === post.id ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </button>

              {selectedPost === post.id && (
                <div className="border-t border-slate-100 dark:border-slate-800 px-5 pb-5">
                  <p className="text-sm text-slate-600 dark:text-slate-300 py-4 whitespace-pre-wrap">{post.content}</p>
                  {/* Comments */}
                  <div className="space-y-3">
                    {(comments[post.id] ?? []).map((c) => (
                      <div key={c.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                        <p className="text-sm text-slate-700 dark:text-slate-200">{c.body}</p>
                        <p className="text-xs text-slate-400 mt-1">{c.author_username}</p>
                      </div>
                    ))}
                  </div>
                  {isAuthenticated && (
                    <div className="flex gap-2 mt-4">
                      <input
                        type="text"
                        placeholder="კომენტარი..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={submitting}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  )}
                  {!isAuthenticated && (
                    <p className="text-xs text-slate-400 mt-3">კომენტარის დასაწერად შედი სისტემაში.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
