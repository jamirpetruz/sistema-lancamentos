"use client";

import { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleSidebar() {
    if (window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <TopBar onToggleSidebar={toggleSidebar} />

      <SideBar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />

      <main
        className={`
          min-h-screen pt-16
          transition-[margin] duration-300 ease-in-out
          ${collapsed ? "md:ml-[72px]" : "md:ml-[250px]"}
        `}
      >
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>

    </div>
  );
}