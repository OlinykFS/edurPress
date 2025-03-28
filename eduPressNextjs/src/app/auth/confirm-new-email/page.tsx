"use client"
import { newEmailConfirmation } from "@/services/api/apiRequests";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TokenPage() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const token = searchParams.get("token");

   async function confirmEmail() {
      if (token) {
         await newEmailConfirmation(token);
      }
   }
   
   useEffect(() => {
      confirmEmail();
      router.push("/profile");
   }, [token]);

   return (
      <section>
         <h1 className="text-center">Thanks</h1>
      </section>
   )
}