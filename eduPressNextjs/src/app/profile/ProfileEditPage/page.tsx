"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/app/context/authContext";
import { UserUpdateDTO, UpdateUserResponseDTO } from "@/services/types";
import { updateProfile } from "@/services/api/apiRequests";

export default function ProfileEditPage() {
  const { user, setUser, logoutAndRedirect, loading } = useAuth();
  const [formData, setFormData] = useState<UserUpdateDTO & { confirmPassword?: string }>({
    username: user?.username || "",
    email: user?.email || "",
    userBio: user?.userBio || "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      logoutAndRedirect();
    }
  }, [user, logoutAndRedirect, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePasswords = () => {
    if (formData.password || formData.confirmPassword) {
      if (formData.password!.length < 6) {
        setPasswordError("Password should be at least 6 characters long");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
        return false;
      }
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setUpdating(true);
    setMessage(null);
    try {
      const { confirmPassword, ...payload } = formData;
      const response: UpdateUserResponseDTO = await updateProfile(payload);
      setMessage(response.message);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      console.error("Profile update failed", error);
      setMessage("Failed to update profile. Please try again.");
    }
    setUpdating(false);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="w-full max-w-[1290px] mx-auto px-4">
        <h1 className="mb-8 font-bold text-3xl text-gray-800 tracking-wide">
          Edit Profile
        </h1>

        {message && (
          <div className="mb-6 p-4 border border-green-300 font-semibold text-center text-green-800 text-sm">
            {message}
          </div>
        )}

        {passwordError && (
          <div className="mb-6 p-4 border border-red-300 font-semibold text-center text-red-800 text-sm">
            {passwordError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div className="flex flex-col justify-between">
              <div>
                <label htmlFor="username" className="block mb-2 font-medium text-gray-700 text-sm">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mt-6">
                <label htmlFor="userBio" className="block mb-2 font-medium text-gray-700 text-sm">
                  Bio
                </label>
                <textarea
                  id="userBio"
                  name="userBio"
                  value={formData.userBio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none h-32 transition-all resize-none"
                  placeholder="Tell us something about yourself"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Changing your email will send you a confirmation link. Your email will be updated only after confirmation.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block mb-2 font-medium text-gray-700 text-sm">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-700 text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 font-medium text-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-3 font-medium text-white transition-all"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
