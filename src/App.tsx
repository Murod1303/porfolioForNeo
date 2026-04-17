import { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./layout/Layout";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
      <Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export default App;
