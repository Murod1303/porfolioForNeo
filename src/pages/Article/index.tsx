import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS } from "../../constants/data";

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, you would fetch the post from an API using the id
  const post = BLOG_POSTS.find((p) => p.id === id);

  useEffect(() => {
    // Scroll to top when article mounts
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
        <button 
          onClick={() => navigate('/blog')}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <article className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-slate-400 mb-10 pb-10 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-xl"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-slate-300"
        >
          {/* Mock Content */}
          <p className="text-xl leading-relaxed font-medium mb-8">
            {post.description}
          </p>
          <p className="leading-relaxed mb-6">
            {post.content}
          </p>
          <h2>Why this matters</h2>
          <p className="leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h3>Key Takeaways</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Modern development requires a strong focus on UX.</li>
            <li>Always optimize images and use semantic HTML.</li>
            <li>Maintainability is just as important as performance.</li>
          </ul>
        </motion.div>

      </article>
    </div>
  );
};

export default Article;
