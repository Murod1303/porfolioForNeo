import type { BlogPost } from "../types";
import { BLOG_POSTS } from "../constants/data";

const STORAGE_KEY = "neo13_blog_posts";

/** localStorage'dan postlarni o'qiydi; agar bo'sh bo'lsa — data.ts dan qaytaradi */
export function getAllPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...BLOG_POSTS];
    const stored: BlogPost[] = JSON.parse(raw);
    return stored.length > 0 ? stored : [...BLOG_POSTS];
  } catch {
    return [...BLOG_POSTS];
  }
}

export function savePosts(posts: BlogPost[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function addPost(post: BlogPost): void {
  const posts = getAllPosts();
  savePosts([post, ...posts]);
}

export function updatePost(id: string, updated: BlogPost): void {
  const posts = getAllPosts();
  savePosts(posts.map((p) => (p.id === id ? updated : p)));
}

export function deletePost(id: string): void {
  const posts = getAllPosts();
  savePosts(posts.filter((p) => p.id !== id));
}

export function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}
