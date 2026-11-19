"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiFileText,
  FiSettings,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";

interface SideBarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onNavigate: () => void;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: FiHome,
  },
  {
    label: "Relatórios",
    href: "/relatorios",
    icon: FiFileText,
  },
  {
    label: "Usuários",
    href: "/usuarios",
    icon: FiUsers,
  },
  {
    label: "Configurações",
    href: "/configuracoes",
    icon: FiSettings,
  },
];

export default function SideBar({
  collapsed,
  mobileOpen,
  onNavigate,
}: SideBarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          onClick={onNavigate}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-16 bottom-0 z-50
          flex flex-col
          border-r border-gray-200
          bg-white
          transition-all duration-300 ease-in-out
          ${collapsed ? "md:w-[72px]" : "md:w-[250px]"}
          w-[250px]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
            S
          </div>

          {!collapsed && (
            <span className="whitespace-nowrap text-base font-semibold text-gray-800">
              Meu Sistema
            </span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Menu principal
            </p>
          )}

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={`
                    flex h-11 items-center gap-3 rounded-lg px-3
                    text-sm font-medium transition-colors
                    ${collapsed ? "md:justify-center" : ""}
                    ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon size={19} className="shrink-0" />

                  <span className={`${collapsed ? "md:hidden" : ""} whitespace-nowrap`}>
                    {item.label}
                  </span>

                  {active && !collapsed && (
                    <FiChevronRight className="ml-auto" size={16} />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Usuário */}
        <div className="flex h-[72px] items-center gap-3 border-t border-gray-100 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
            JN
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                Administrador
              </p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}