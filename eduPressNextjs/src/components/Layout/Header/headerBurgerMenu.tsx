"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileNavigation from './MobileNavigation';

interface BurgerMenuProps {
  isAuthenticated: boolean;
  user: any;
}

export default function BurgerMenu({ isAuthenticated, user }: BurgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => setIsOverlayVisible(false), 300);
      document.body.style.overflow = 'auto';
    } else {
      setIsOverlayVisible(true);
      setTimeout(() => {
        setIsMenuOpen(true);
        document.body.style.overflow = 'hidden';
      }, 10);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setIsOverlayVisible(false), 300);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <button onClick={toggleMenu} className="text-gray-600 hover:text-orange-600 z-50 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {isOverlayVisible && (
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          } z-40`}
          onClick={closeMenu}
          style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Image src="/img/Logo.svg" alt="Logo" width={40} height={30} />
            <span className="pl-[2px] font-bold text-2xl">EduPress</span>
          </Link>
          <button onClick={closeMenu} className="text-gray-600 hover:text-orange-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <MobileNavigation
          closeMenu={closeMenu}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </div>
    </>
  );
}
