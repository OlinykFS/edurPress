"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Admin/Header/Navigation";
import type { AdminComponents } from "@/app/admin/page";

interface AdminHeaderProps {
  activeComponent: AdminComponents;
  setActiveComponent: (key: AdminComponents) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function AdminHeader({ 
  activeComponent, 
  setActiveComponent,
  isSidebarOpen,
  toggleSidebar
}: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const getInitials = (name: string): string => {
    if (!name) return "NA";
    const parts = name.split(" ");
    return parts
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <>
      <header className="border-gray-700 bg-[#1F2A37]  px-4 py-2 border-b w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-400 hover:text-orange-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" 
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <button
              onClick={toggleSidebar}
              className="md:block hidden p-2 text-gray-400 hover:text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M15.75 19.5L8.25 12l7.5-7.5" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                )}
              </svg>
            </button>
            <Link href="/" className="font-bold text-2xl text-white">
              EduPress
            </Link>
          </div>
          <div className="sm:flex flex-1 justify-center hidden px-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#374151] py-2 pr-4 pl-10 rounded-lg focus:ring-1 focus:ring-white w-full text-white focus:outline-none"
              />
              <Image
                src="/img/icons/adminIcons/search.svg"
                alt="Search Icon"
                width={20}
                height={20}
                className="top-1/2 left-3 absolute transform -translate-y-1/2"
              />
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <Link href="/profile" className="relative">
                {user.avatarUrl ? (
                  <div className="rounded-full w-10 h-10 overflow-hidden">
                    <Image
                      src={user.avatarUrl}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-gray-500 rounded-full w-10 h-10 font-bold text-white">
                    {getInitials(user.username || "")}
                  </div>
                )}
              </Link>
            ) : (
              <div className="flex justify-center items-center bg-gray-300 rounded-full w-10 h-10 font-bold text-white">
                ?
              </div>
            )}
          </div>
        </div>
        <div className="sm:hidden mt-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#374151] py-2 pr-4 pl-10 rounded-lg focus:ring-1 focus:ring-white w-full text-white focus:outline-none"
            />
            <Image
              src="/img/icons/adminIcons/search.svg"
              alt="Search Icon"
              width={20}
              height={20}
              className="top-1/2 left-3 absolute transform -translate-y-1/2"
            />
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 bg-black/50 md:hidden ${
        isMenuOpen ? 'block' : 'hidden'
      }`} onClick={closeMenu} />

      <div className={`fixed top-0 left-0 h-full w-80 bg-[#1F2A37] text-white 
        transform transition-transform duration-300 z-50 md:hidden ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex justify-between items-center border-gray-700 p-4 border-b">
          <span className="font-bold text-xl">Menu</span>
          <button onClick={closeMenu} className="text-gray-400 hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
              strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Navigation 
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          onNavigate={closeMenu}
        />
      </div>
    </>
  );
}