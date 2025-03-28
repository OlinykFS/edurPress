"use client";
import { useState } from "react";
import {register} from "@/services/authService"
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      await register(username, email, password);
      router.push("/login?verification=sent");
    } catch (error) {
      setError(error + "error");
    }
  };

  return (
    <div className="flex justify-center items-center my-32">
      <div className="border-[#EAEAEA] border-[1px] bg-white shadow-lg p-8 rounded-md w-full max-w-md">
        <h2 className="mb-6 font-bold text-3xl text-center">Register</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            className="border-[#9D9D9D] px-4 border rounded focus:ring-2 focus:ring-[#FF6C00] w-full h-12 focus:outline-none placeholder-gray-500"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="border-[#9D9D9D] px-4 border rounded focus:ring-2 focus:ring-[#FF6C00] w-full h-12 focus:outline-none placeholder-gray-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <div className="relative">
            <input
              className="border-[#9D9D9D] px-4 border rounded focus:ring-2 focus:ring-[#FF6C00] w-full h-12 focus:outline-none placeholder-gray-500"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="right-4 absolute inset-y-0 flex items-center"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z" fill="#9D9D9D"/>
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              className="border-[#9D9D9D] px-4 border rounded focus:ring-2 focus:ring-[#FF6C00] w-full h-12 focus:outline-none placeholder-gray-500"
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="right-4 absolute inset-y-0 flex items-center"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z" fill="#9D9D9D"/>
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#FF6C00] hover:bg-[#e65b00] rounded w-full h-12 font-bold text-white transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
