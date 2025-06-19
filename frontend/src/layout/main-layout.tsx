import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 text-gray-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-gray-100 selection:bg-teal-500 selection:text-white transition-colors duration-500">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
