import React from "react";
import Navigation from "../components/shared/Navigation";

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ darkMode, setDarkMode, children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>{children}</main>
      <footer className="py-8 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-slate-400">
            © 2024 Murod Shernazaroff. Crafted with passion and coffee ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
