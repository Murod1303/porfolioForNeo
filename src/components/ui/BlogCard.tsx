import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "../../types";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/blog/${post.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read article {post.title}</span>
      </Link>
      
      {/* Image Container with Zoom effect */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 backdrop-blur-md rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
          {post.description}
        </p>

        {/* Read More button at the bottom */}
        <div className="mt-auto flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
          Read Article <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
