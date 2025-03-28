"use client";

import { useAuth } from "@/app/context/authContext";
import type { AdminComponents } from "@/app/admin/page";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: "🏠" },
  { key: "users", label: "Users", icon: "👥" },
  { key: "courses", label: "Courses", icon: "📚" },
  { key: "categories", label: "Categories", icon: "🗂️" },
  { key: "instructorApplicationManagement", label: "Instructor Applications", icon: "📝" },
  { key: "instructorManagement", label: "Instructors", icon: "👨" },
  { key: "articleDashboard", label: "Articles", icon: "📰" },
  { key: "articleCategories", label: "Article Categories", icon: "📰" },
];

const SECONDARY_NAV = [
  { key: "docs", label: "Docs", icon: "📄" },
  { key: "components", label: "Components", icon: "🧩" },
  { key: "help", label: "Help", icon: "❓" },
];

interface NavigationProps {
  activeComponent: AdminComponents;
  setActiveComponent: (key: AdminComponents) => void;
  onNavigate?: () => void;
  isCompact?: boolean;
}

export const Navigation = ({ 
  activeComponent, 
  setActiveComponent,
  onNavigate,
  isCompact = false
}: NavigationProps) => {
  const { logoutAndRedirect } = useAuth();

  const handleClick = (key: AdminComponents) => {
    setActiveComponent(key);
    onNavigate?.();
  };

  return (
    <div className={`h-full flex flex-col justify-between ${isCompact ? "w-16" : "w-64"}`}>
      <nav className="p-2">
        <ul className="pb-4">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.key}
              className={`flex items-center p-2 rounded-md cursor-pointer transition-all ${
                activeComponent === item.key 
                  ? "bg-gray-700 text-white font-semibold " 
                  : "hover:bg-gray-700 text-gray-300 "
              } ${isCompact ? "justify-center" : "justify-start gap-2"}`}
              onClick={() => handleClick(item.key as AdminComponents)}
            >
              {isCompact ? (
                <span title={item.label}>{item.icon}</span>
              ) : (
                <>
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-gray-700 p-2 border-t">
        <ul className="space-y-1">
          {SECONDARY_NAV.map((item) => (
            <li 
              key={item.key} 
              className={`flex items-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all ${
                isCompact ? "justify-center" : "justify-start gap-2"
              }`}
              title={isCompact ? item.label : undefined}
            >
              {isCompact ? (
                <span>{item.icon}</span>
              ) : (
                <>
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </li>
          ))}
          <li>
            <button 
              onClick={logoutAndRedirect}
              className={`w-full flex items-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all ${
                isCompact ? "justify-center" : "justify-start gap-2"
              }`}
              title={isCompact ? "Logout" : undefined}
            >
              {isCompact ? "🚪" : "Logout"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};