import { Outlet } from "react-router-dom";
import Header from "@/pages/components/Header";

const RootLayout = () => {
  return (
    <div className="text-slate-950 dark:text-slate-100">
      <Header />
      <div className="container mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
