"use client";

import "./globals.css";
import Header from "../components/Layout/Header/header";
import Footer from "@/components/Layout/Footer/footer";
import { AuthProvider } from "@/app/context/authContext";
import Breadcrumb from "@/components/Layout/BreadCrumb/breadCrumb";
import { usePathname } from "next/navigation";
import ScrollToTopButton from "@/components/Layout/Main/ScrollToTopButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const excludedAdminPaths = ["/admin", "/instructorDashboard"];
  const excludedPaths = [
    "/",
    "/admin",
    "/profile",
    "/instructorDashboard",
  ];


  const isLessonPage = /^\/courses\/course\/\d+\/lessons\/\d+/.test(pathname);

  return (
    <html lang="en">
      <head>
        <title>EduPress</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-exo min-h-screen flex flex-col">
        <AuthProvider>
          {!excludedAdminPaths.includes(pathname) && !isLessonPage && (
            <div className="w-full bg-white mx-auto">
              <Header />
            </div>
          )}
          {!excludedPaths.includes(pathname) && !isLessonPage && (
            <div className="relative">
              <Breadcrumb />
            </div>
          )}

          <main className="flex-grow font-exo">{children}</main>

          {!excludedAdminPaths.includes(pathname) && !isLessonPage && (
            <div className="mt-auto">
              <Footer />
            </div>
          )}
          <div className="z-50">
          <ScrollToTopButton />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}