import { motion } from "framer-motion";
import BlogCard from "../../components/ui/BlogCard";
import { Sparkles } from "lucide-react";
import { getAllPosts } from "../../utils/blogStorage";
import { useState, useEffect } from "react";
import type { BlogPost } from "../../types";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Thoughts &amp; Insights</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Sharing my journey, thoughts on modern web development, and tutorials on building scalable applications.
          </p>
        </motion.div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-slate-500">
            Hali blog postlar yo&apos;q.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;
