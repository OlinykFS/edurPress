"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchCourse } from "@/handlers/Course/getCourse";
import { Course } from "@/services/types";
import Image from "next/image";
import { useAuth } from "../context/authContext";
import PaymentForm from "@/components/User/paymentForm";

export default function CheckoutPage() {
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  useEffect(() => {
    if (courseId) {
      fetchCourse(Number(courseId), setCourse, setError).finally(() => {
        setLoading(false);
      });
    } else {
      setError("Course ID is missing");
      setLoading(false);
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-100 min-h-screen">
        <div className="border-[#FF782D] border-b-2 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-gray-100 min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center bg-gray-100 min-h-screen">
        <p className="text-red-500 text-xl">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="mx-auto max-w-[1290px]">
        {!isAuthenticated && (
          <div className="bg-red-100 mb-6 px-4 py-3 border border-red-400 rounded text-red-700">
            Please log in to enroll in the course!
          </div>
        )}

        <div className="flex gap-8">
          <div className="flex-1 bg-white shadow-md p-8 rounded-lg">
            <h4 className="mb-4 font-bold text-2xl">Your order</h4>
            <div className="mb-4 pb-4 border-b">
              <div className="flex items-center gap-4">
                <Image
                  src={course.imageUrl || "/img/courseImageNotFound.jpg"}
                  alt={course.title || "Course image"}
                  width={100}
                  height={60}
                  className="rounded w-24 h-16 object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">{course.title || "Unknown Course"}</p>
                  <p className="text-gray-500 text-sm">by {course.instructorName || "Unknown Author"}</p>
                </div>
                <p className="ml-auto font-bold text-lg">${course.price || 0}.00</p>
              </div>
            </div>
            <div className="mb-8">
              <h4 className="mb-4 font-bold text-2xl">Additional Information</h4>
              <textarea
                placeholder="Note to administrator"
                className="p-2 border rounded w-full"
                rows={4}
              ></textarea>
            </div>
           
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 py-3 rounded w-full text-white"
            >
              Place order
            </button>
            <p className="mt-4 text-gray-600 text-sm">
              By completing your purchase you agree to those{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Term Conditions
              </a>
              .
            </p>
          </div>
          <div className="top-8 sticky bg-white shadow-md p-6 rounded-lg w-[350px] h-fit">
          <PaymentForm/>
          </div>
        </div>
        {!isAuthenticated && (
          <div className="bg-white shadow-md mt-8 p-8 rounded-lg">
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`text-lg font-semibold ${
                  isLogin ? "text-[#FF782D]" : "text-gray-500"
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`text-lg font-semibold ${
                  !isLogin ? "text-[#FF782D]" : "text-gray-500"
                }`}
              >
                Sign up
              </button>
            </div>
            {isLogin ? (
              <div>
                <h4 className="mb-4 font-bold text-2xl">Sign in</h4>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block font-medium text-gray-700 text-sm">
                      Username or email
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Email or username"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block font-medium text-gray-700 text-sm">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#FF782D] hover:bg-[#FF682D] py-3 rounded w-full text-white"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h4 className="mb-4 font-bold text-2xl">Sign up</h4>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block font-medium text-gray-700 text-sm">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="block font-medium text-gray-700 text-sm">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block font-medium text-gray-700 text-sm">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#FF782D] hover:bg-[#FF682D] py-3 rounded w-full text-white"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}