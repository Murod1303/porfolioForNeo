import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
  X,
  Save,
  ShieldCheck,
  BookOpen,
  Tag,
  Clock,
  ImageIcon,
  FileText,
  AlignLeft,
} from "lucide-react";
import type { BlogPost } from "../../types";
import {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  generateId,
} from "../../utils/blogStorage";

// ───────────────────────── Auth Gate ─────────────────────────
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "admin123";
const AUTH_KEY = "neo13_admin_auth";

function useAdminAuth() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "1",
  );
  const login = (pw: string) => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    navigate("/");
  };
  return { authed, login, logout };
}

// ───────────────────────── Login Page ─────────────────────────
const LoginPage: React.FC<{ onLogin: (pw: string) => boolean }> = ({
  onLogin,
}) => {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(pw);
    if (!ok) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-400 text-sm mt-1">neo13 Portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="admin-pw"
                className="text-sm font-medium text-slate-300"
              >
                Parol
              </label>
              <div className="relative">
                <input
                  id="admin-pw"
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-slate-800 border text-white placeholder-slate-500 outline-none transition-all ${
                    error
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-slate-700 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Parolni yashir" : "Parolni ko'rsat"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {show ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs"
                  >
                    Noto'g'ri parol. Qayta urinib ko'ring.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-shadow"
            >
              Kirish
            </motion.button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Faqat portfolio egasi uchun
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// ───────────────────────── Blog Form Modal ─────────────────────────
const EMPTY_POST: Omit<BlogPost, "id"> = {
  title: "",
  description: "",
  content: "",
  image: "",
  date: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  readTime: "3 min read",
  tags: [],
};

interface BlogFormProps {
  initial?: BlogPost;
  onSave: (post: BlogPost) => void;
  onClose: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initial, onSave, onClose }) => {
  const isEdit = !!initial;
  const [form, setForm] = useState<Omit<BlogPost, "id">>(
    initial ? { ...initial } : { ...EMPTY_POST },
  );
  const [tagInput, setTagInput] = useState("");

  const set = (key: keyof typeof form, val: string | string[]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set("tags", [...form.tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (t: string) =>
    set(
      "tags",
      form.tags.filter((x) => x !== t),
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = isEdit
      ? initial!.id
      : generateId(form.title) || Date.now().toString();
    onSave({ id, ...form });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            {isEdit ? (
              <Pencil className="w-5 h-5 text-blue-400" />
            ) : (
              <Plus className="w-5 h-5 text-green-400" />
            )}
            {isEdit ? "Postni tahrirlash" : "Yangi blog post"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Sarlavha *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Maqola sarlavhasi"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5" /> Qisqa tavsif *
            </label>
            <textarea
              required
              rows={2}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Blog kartada ko'rinadigan tavsif"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> To'liq matn *
            </label>
            <textarea
              required
              rows={8}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Maqolaning to'liq matni (Markdown qo'llab-quvvatlanadi)"
              className={`${inputClass} resize-none font-mono text-xs`}
            />
          </div>

          {/* Image + Date + ReadTime */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> Rasm URL
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Sana
              </label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                placeholder="May 18, 2026"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                O'qish vaqti
              </label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => set("readTime", e.target.value)}
                placeholder="5 min read"
                className={inputClass}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Teglar
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder="Teg yozing va Enter bosing"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Qo'shish
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {form.tags.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-900/40 border border-blue-700/40 text-blue-300 text-xs rounded-full"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      aria-label={`${t} tegini olib tashlash`}
                      className="text-blue-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium transition-colors"
            >
              Bekor qilish
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-shadow"
            >
              <Save className="w-4 h-4" />
              {isEdit ? "Saqlash" : "Nashr qilish"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// ───────────────────────── Post Card ─────────────────────────
const PostCard: React.FC<{
  post: BlogPost;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ post, index, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-colors"
  >
    {post.image && (
      <div className="relative overflow-hidden h-36">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>
    )}
    <div className="p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onEdit}
            aria-label="Tahrirlash"
            className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-900/20 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            aria-label="O'chirish"
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-400 line-clamp-2 mb-3">
        {post.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-500">{post.date}</span>
      </div>
    </div>
  </motion.div>
);

// ───────────────────────── Main Admin Page ─────────────────────────
const AdminPage: React.FC = () => {
  const { authed, login, logout } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | undefined>(undefined);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load posts
  useEffect(() => {
    if (authed) setPosts(getAllPosts());
  }, [authed]);

  if (!authed) return <LoginPage onLogin={login} />;

  const handleSave = (post: BlogPost) => {
    if (editPost) {
      updatePost(post.id, post);
    } else {
      addPost(post);
    }
    setPosts(getAllPosts());
    setShowForm(false);
    setEditPost(undefined);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    setPosts(getAllPosts());
    setDeleteConfirm(null);
  };

  const openEdit = (post: BlogPost) => {
    setEditPost(post);
    setShowForm(true);
  };

  const openNew = () => {
    setEditPost(undefined);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              Blog Admin
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {posts.length} ta post mavjud
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openNew}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Yangi post
            </motion.button>
            <button
              onClick={logout}
              aria-label="Chiqish"
              className="p-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-900/20 border border-slate-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Jami postlar", value: posts.length, color: "blue" },
            {
              label: "Teglar",
              value: [...new Set(posts.flatMap((p) => p.tags))].length,
              color: "purple",
            },
            {
              label: "So'nggi",
              value: posts[0]?.date ?? "—",
              color: "pink",
              text: true,
            },
          ].map(({ label, value, color, text }) => (
            <div
              key={label}
              className={`bg-slate-900 border border-slate-800 rounded-2xl p-4`}
            >
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className={`text-${color}-400 font-bold text-xl`}>
                {text ? String(value) : value}
              </p>
            </div>
          ))}
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Hali post yo'q. Birinchi postni qo'shing!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                index={i}
                onEdit={() => openEdit(post)}
                onDelete={() => setDeleteConfirm(post.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Blog Form Modal */}
      <AnimatePresence>
        {showForm && (
          <BlogForm
            initial={editPost}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditPost(undefined);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-900/30 border border-red-800/50 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Postni o'chirish</h3>
                  <p className="text-sm text-slate-400">
                    Bu amalni qaytarib bo'lmaydi
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
                >
                  O'chirish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
