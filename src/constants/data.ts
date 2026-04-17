import type { Project, Skill, Experience, BlogPost } from "../types";

export const ROLES = [
  "Frontend Developer",
  "Fullstack Developer",
  "UI/UX Engineer",
  "Creative Developer",
];

export const NAME = "Murod Shernazaroff";

export const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat app with AI-powered responses",
    tech: ["TypeScript", "WebSocket", "OpenAI", "Redis"],
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization dashboard for business metrics",
    tech: ["React", "D3.js", "Tailwind", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool",
    tech: ["Next.js", "PostgreSQL", "Prisma", "tRPC"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
];

export const SKILLS: Skill[] = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "MongoDB", level: 80 },
  { name: "Next.js", level: 88 },
];

export const EXPERIENCE: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading frontend development for enterprise applications",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2020 - 2022",
    description: "Built scalable web applications using modern tech stack",
  },
  {
    title: "Junior Developer",
    company: "StartUp Hub",
    period: "2019 - 2020",
    description: "Developed and maintained client websites and web apps",
  },
];

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
  letterVariants: {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "how-to-optimize-react",
    title: "How to optimize React applications in 2024",
    description: "Learn the modern ways to keep your React applications fast and performant using the latest features.",
    content: "Full content of the blog post goes here... In a real app this would be fetched from a CMS or Notion API.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    date: "Oct 24, 2024",
    readTime: "5 min read",
    tags: ["React", "Performance"],
  },
  {
    id: "building-design-systems",
    title: "Building scalable Design Systems with Tailwind CSS",
    description: "A comprehensive guide to creating maintainable and scalable design systems using Tailwind CSS.",
    content: "Full content of the blog post goes here... In a real app this would be fetched from a CMS or Notion API.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    date: "Nov 02, 2024",
    readTime: "8 min read",
    tags: ["UI/UX", "Tailwind"],
  },
  {
    id: "future-of-frontend",
    title: "The Future of Frontend Development",
    description: "My thoughts on where frontend development is heading with the rise of AI and new frameworks.",
    content: "Full content of the blog post goes here... In a real app this would be fetched from a CMS or Notion API.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    date: "Nov 15, 2024",
    readTime: "4 min read",
    tags: ["Career", "AI"],
  }
];
