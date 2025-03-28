"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);

  return (
    <div className="relative">
      <div className="top-0 left-0 z-[-1] absolute bg-[#F5F5F5] w-full h-[50px]" />
      <nav aria-label="breadcrumb" className="flex items-center mx-auto max-w-[1290px] h-[50px]">
        <ol className="flex flex-wrap items-center space-x-2 px-4 text-sm md:text-base">
          <li>
            <Link href="/" className="text-blue-500 hover:underline">
              Homepage
            </Link>
          </li>
          {pathParts.map((part, index) => (
            <li key={index} className="flex items-center">
              <span className="mx-1">
                <Image
                  src={`/img/icons/breadCrumbIcon/Icon.svg`}
                  width={16}
                  height={16}
                  alt="icon"
                  quality={100}
                />
              </span>
              <Link href={`/${pathParts.slice(0, index + 1).join('/')}`} className="line-clamp-2 text-gray-600 hover:underline">
                {decodeURIComponent(part)}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}