
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  MapPin,
  Brain,
  CalendarDays,
  Settings,
  PanelLeftClose,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "All Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    label: "AI Blog Generator",
    href: "/admin/blogs/new",
    icon: Sparkles,
  },
  {
    label: "Local SEO",
    href: "/admin/local-seo",
    icon: MapPin,
  },
  {
    label: "SEO Skills & Prompts",
    href: "/admin/skills",
    icon: Brain,
  },
  {
    label: "Content Planner",
    href: "/admin/planner",
    icon: CalendarDays,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
          B
        </div>

        <div>
          <h1 className="text-sm font-bold text-gray-900">
            BlogStudio
          </h1>
          <p className="text-xs text-gray-500">
            AI Publishing
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              Blog Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
