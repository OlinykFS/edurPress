export type NavItem = {
   title: string;
   href: string;
   children?: NavItem[];
 };
 
 export const NAVIGATION_CONFIG = {
   main: [
     { title: "Home", href: "/" },
     { title: "Courses", href: "/courses" },
     { title: "Blog", href: "/articles" },
     {
       title: "Pages",
       href: "#",
       children: [
         { title: "About Us", href: "/about" },
         { title: "Contact", href: "/contact" },
         { title: "Become an Instructor", href: "/Instructors" },
       ],
     },
   ],
   auth: [
     { title: "Login", href: "/login" },
     { title: "Register", href: "/register" },
   ],
 };