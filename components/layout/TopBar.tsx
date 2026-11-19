"use client";

import {
  FiMenu,
  FiBell,
  FiSearch,
} from "react-icons/fi";

interface TopBarProps {
  onToggleSidebar: () => void;
}

export default function TopBar({
  onToggleSidebar,
}: TopBarProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-[60] flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">

      {/* Lado esquerdo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Abrir ou fechar menu"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <FiMenu size={22} />
        </button>

        <span className="text-sm font-semibold text-gray-800">
          Painel Administrativo
        </span>
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-3">

        <button className="hidden rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 sm:block">
          <FiSearch size={19} />
        </button>

        <button className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100">
          <FiBell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          JN
        </div>
      </div>
    </header>
  );
}