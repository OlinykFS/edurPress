"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import { login as LoginService } from "@/services/authService";
import { handleError } from "@/services/api/api";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verificationStatus = searchParams.get("verification");
    if (verificationStatus === "sent") {
      setInfoMessage("Check your email to confirm your account.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (error) setError(null);
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await LoginService(email, password, rememberMe);
      login();
    } catch (e) {
      setError(handleError(e));
    }
  };

  return (
    <div className="flex justify-center items-center my-32">
      <div className="border-[#EAEAEA] border-[1px] bg-white shadow-lg p-8 rounded-md w-full max-w-md">
        <h2 className="mb-6 font-bold text-3xl text-center">Login</h2>
        {infoMessage && <p className="mb-4 text-blue-600">{infoMessage}</p>}
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            className="border-[#9D9D9D] px-4 border rounded focus:ring-2 focus:ring-[#FF6C00] w-full h-12 focus:outline-none placeholder-gray-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or username"
            required
          />
          <input
            className="border-[#9D9D9D] px-4 border rounded focus:ring-2 focus:ring-[#FF6C00] w-full h-12 focus:outline-none placeholder-gray-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="flex justify-between items-center">
          <div className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="border-gray-300 rounded focus:ring-[#FF6C00] w-4 h-4 text-[#FF6C00]"
              />
              <label className="block ml-2 text-gray-700 text-sm">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-[#FF6C00] hover:underline">Lost your password?</a>
            </div>
          </div>
          <button type="submit" className="bg-[#FF6C00] hover:bg-[#e65b00] rounded w-full h-12 font-bold text-white transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
