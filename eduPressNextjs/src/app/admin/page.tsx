"use client";

import { useState } from "react";
import AdminHeader from "@/components/Admin/Header/AdminHeader";
import { Navigation } from "@/components/Admin/Header/Navigation";
import CourseDashboard from "@/components/Admin/AdminCourseComponents/courseManagement";
import InstructorApplicationManagement from "@/components/Admin/instructorApplicationManagement";
import CategoryManagement from "@/components/Admin/categoryManagement";
import UserManagement from "@/components/Admin/userManagement";
import ArticleDashboard from "@/components/Admin/AdminArticle/article";
import InstructorManagement from "@/components/Admin/instructorManagement";
import Overview from "@/components/Admin/Overviews/overview";
import ArticleCategoryManagement from "@/components/Admin/AdminArticle/ArticleCategoryManagement";

export type AdminComponents = 
  "overview" | 
  "users" | 
  "courses" | 
  "categories" | 
  "instructorApplicationManagement" | 
  "instructorManagement" | 
  "articleDashboard" |
  "articleCategories";

const COMPONENTS: Record<AdminComponents, JSX.Element> = {
  overview: <div className="bg-[#111928] p-4 min-h-full"><Overview /></div>,
  users: <div className="bg-[#111928] p-4 min-h-full"><UserManagement /></div>,
  courses: <div className="bg-[#111928] p-4 min-h-full"><CourseDashboard /></div>,
  categories: <div className="bg-[#111928] p-4 min-h-full"><CategoryManagement /></div>,
  instructorApplicationManagement: <div className="bg-[#111928] p-4 min-h-full"><InstructorApplicationManagement /></div>,
  instructorManagement: <div className="bg-[#111928] p-4 min-h-full"><InstructorManagement /></div>,
  articleDashboard: <div className="bg-[#111928] p-4 min-h-full"><ArticleDashboard /></div>,
  articleCategories: <div className="bg-[#111928] p-4 min-h-full"><ArticleCategoryManagement /> </div>,
};

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState<AdminComponents>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <section className="bg-[#111928] min-h-screen">
      <AdminHeader 
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex text-black">
        <aside className={`hidden md:block min-h-screen bg-[#1F2A37] text-white 
          border-r border-gray-700 transition-all duration-300
          ${isSidebarOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`} 
        >
          <Navigation 
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
            isCompact={!isSidebarOpen}
          />
        </aside>
        <main className="flex-1 transition-all duration-300">
          <div className="shadow-lg rounded-md h-[calc(100vh-4rem)] min-h-full ">
            {COMPONENTS[activeComponent]}
          </div>
        </main>
      </div>
    </section>
  );
}