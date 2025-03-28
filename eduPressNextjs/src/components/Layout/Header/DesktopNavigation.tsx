'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useOutsideClick } from '@/services/hooks/useOutsideClick';
import { NAVIGATION_CONFIG } from './navigation';

export default function DesktopNavigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useOutsideClick(dropdownRef, () => setOpenDropdown(null));

  const handleHover = (title: string, state: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (state) {
      setOpenDropdown(title);
    } else {
      timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
    }
  };

  return (
    <nav className="relative md:flex hidden h-full text-[16px]">
      {NAVIGATION_CONFIG.main.map((item) => (
        item.children ? (
          <div
            key={item.title}
            className="group relative h-full"
            onMouseEnter={() => handleHover(item.title, true)}
            onMouseLeave={() => handleHover(item.title, false)}
            ref={dropdownRef}
          >
            <button className="flex items-center px-5 h-full menu-item">
              {item.title}
              <svg
                className={`ml-2 w-4 h-4 transition-transform ${
                  openDropdown === item.title ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute left-0 z-20 bg-white border border-gray-100 rounded-lg shadow-xl transition-all ${
                openDropdown === item.title
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
              }`}
              style={{ top: 'calc(100% + 4px)', minWidth: '200px' }}
            >
              <div className="space-y-1 p-2">
                {item.children.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    className="flex items-center hover:bg-gray-50 px-4 py-2.5 rounded-lg text-gray-700"
                  >
                    <span className="font-medium text-[15px]">{child.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center px-5 menu-item hover:text-orange-600"
          >
            {item.title}
          </Link>
        )
      ))}
    </nav>
  );
}