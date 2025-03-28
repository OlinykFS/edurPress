'use client';
import Link from 'next/link';
import { useAuth } from '@/app/context/authContext';
import Image from 'next/image';

import UserAvatar from './UserAvatar';
import BurgerMenu from './headerBurgerMenu';
import DesktopNavigation from './DesktopNavigation';


export default function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="z-50 bg-white shadow-sm w-full h-[72px] font-exo">
      <div className="flex justify-between items-center mx-auto px-4 max-w-[1290px] h-full container">
        <Link href="/" className="flex items-center">
          <Image src="/img/Logo.svg" alt="Logo" width={40} height={30} priority />
          <span className="pl-[2px] font-bold text-3xl">EduPress</span>
        </Link>

        <DesktopNavigation />

        <div className="flex items-center space-x-4 ml-4 h-full">
          {isAuthenticated ? (
            <Link href="/profile" className="hidden md:block">
              <UserAvatar user={user} size="md" />
            </Link>
          ) : (
            <div className="hidden md:flex h-full text-[16px] gap-4">
              <Link href="/login" className="hover:text-orange-600 menu-item">
                Login
              </Link>
              <Link href="/register" className="text-orange-500 hover:text-black menu-item">
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-end md:hidden pr-4">
          <BurgerMenu isAuthenticated={isAuthenticated} user={user} />
        </div>
      </div>
    </header>
  );
}