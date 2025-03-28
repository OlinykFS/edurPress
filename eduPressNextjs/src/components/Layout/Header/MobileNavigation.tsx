'use client';
import { useState } from 'react';
import Link from 'next/link';
import UserAvatar from './UserAvatar';
import { NAVIGATION_CONFIG } from './navigation';

export default function MobileNavigation({
  closeMenu,
  isAuthenticated,
  user,
}: {
  closeMenu: () => void;
  isAuthenticated: boolean;
  user: any;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <nav className="p-4">
      {NAVIGATION_CONFIG.main.map((item) =>
        item.children ? (
          <div key={item.title} className="relative">
            <button
              onClick={() => toggleDropdown(item.title)}
              className="flex items-center justify-between w-full py-2 text-[24px] hover:text-orange-600"
            >
              {item.title}
              <svg
                className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                  openDropdown === item.title ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                openDropdown === item.title
                  ? 'opacity-100 max-h-96 visible'
                  : 'opacity-0 max-h-0 invisible'
              }`}
            >
              {item.children.map((child) => (
                <Link
                  key={child.title}
                  href={child.href}
                  onClick={closeMenu}
                  className="block hover:bg-gray-100 px-4 py-2 text-[16px] transition-colors duration-200"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={closeMenu}
            className="block py-2 text-[24px] hover:text-orange-600 transition-colors duration-200"
          >
            {item.title}
          </Link>
        )
      )}

      {!isAuthenticated &&
        NAVIGATION_CONFIG.auth.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={closeMenu}
            className="block py-2 text-[24px] hover:text-orange-600 transition-colors duration-200"
          >
            {item.title}
          </Link>
        ))}

      {isAuthenticated && (
        <Link
          href="/profile"
          onClick={closeMenu}
          className="block py-2 text-[24px] hover:text-orange-600 transition-colors duration-200 border-b border-gray-200"
        >
          Profile
        </Link>
      )}

      {isAuthenticated && (
        <div className="mt-4" onClick={closeMenu}>
          <UserAvatar user={user} size="lg" />
        </div>
      )}
    </nav>
  );
}