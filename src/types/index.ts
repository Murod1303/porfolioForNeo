export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface MagneticButtonProps {
  children: React.ReactNode;
  mouseX: number;
  mouseY: number;
  primary?: boolean;
  href?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
}
