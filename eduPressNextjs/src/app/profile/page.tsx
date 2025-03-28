"use client";

import { useState, useEffect } from "react";
import AvatarUploader from "@/components/User/avatarUploader";
import Image from "next/image";
import AddApplicationModal from "@/components/User/InstructorComponents/applicationComponents/addApplication";
import CoursesTabs from "@/components/User/UserCoursesTabs";
import { useAuth } from "@/app/context/authContext";
import { getInitials } from "@/services/utils/utils";
import { getUserDailyCompletion, getUserStats } from "@/services/api/apiRequests";
import { UserStats, UserDailyCompletions } from "@/services/types";
import SmartPieChart from "@/components/User/StatsPieChart";
import { CalendarContributionChart } from "@/components/User/UserCalendarChart";
import { useRouter } from "next/navigation";
import UserAchievements from "@/components/User/userAchievements";

export default function ProtectedPage() {
  const { user, hasRole, logoutAndRedirect, loading } = useAuth();
  const [uploaderVisible, setUploaderVisible] = useState(false);
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const [dailyCompletions, setDailyCompletions] = useState<UserDailyCompletions[]>([]);

  const router = useRouter();
  const today = new Date();
  console.log(today)
  useEffect(() => {
    if (!loading && !user) {
      logoutAndRedirect();
    }
  }, [user, logoutAndRedirect, loading]);

  useEffect(() => {
    if (user) {
      getUserStats()
        .then((data) => {
          setStats(data);
          setLoadingStats(false);
        })
        .catch((err) => {
          console.error("Error fetching stats:", err);
          setLoadingStats(false);
        });

      getUserDailyCompletion()
        .then((data) => {
          setDailyCompletions(data);
        })
        .catch((err) => {
          console.error("Error fetching daily completions:", err);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Redirecting...
      </div>
    );
  }

  const chartData = dailyCompletions.map((completion) => ({
    date: completion.date, 
    count: completion.totalCompletions,
}));

  return (
    <>
      <div className="mx-auto max-w-[1290px] py-4">
        <div className="flex flex-col md:flex-row">
          
        <aside className="w-full md:w-1/3 p-6 flex flex-col gap-8">
          <div className="space-y-6">
            <div className="flex gap-4 max-lg:flex-col">
              <div
                onClick={() => setUploaderVisible(true)}
                className="relative max-w-[200px] min-w-[120px] max-h-[180px] min-h-[120px] w-full h-full rounded-xl overflow-hidden ring-4 ring-orange-200 cursor-pointer transition-transform duration-300 hover:scale-105 group"
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt="User Avatar"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                    
                  />
                ) : (
                  <div
                      className={`text-6xl max-w-[200px] min-w-[120px] max-h-[180px] min-h-[120px] w-full h-full  bg-black text-white  font-bold flex items-center justify-center`}
                    >
                      {getInitials(user?.username || '')}
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <h2 className=" font-bold text-gray-800">{user.username}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                {user.userBio || "No bio provided. Share something about yourself!"}
              </p>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">
                  <span className="font-semibold">Member Since:</span>{" "}
                  {user.joinDate
                    ? new Date(user.joinDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-xs text-gray-400">
                  <span className="font-semibold">Role:</span> {user.role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col  gap-4">
            <div className="space-y-4">
              <button
                onClick={() => router.push("/profile/ProfileEditPage")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors"
                aria-label="Edit Profile"
              >
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="font-semibold text-indigo-600">Edit Profile</span>
              </button>

              <div className="gap-3  flex max-lg:flex-col max-md:flex-row">
                <button
                  onClick={() => setUploaderVisible(true)}
                  className="flex flex-1 items-center gap-2 px-4 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors"
                  aria-label="Change Avatar"
                >
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-pink-600">Change Avatar</span>
                </button>

                {(hasRole("ADMIN")) && (
                  <a
                    href="/admin"
                    className="flex flex-1 items-center gap-2 px-4 py-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
                    aria-label="Dashboard"
                  >
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-medium text-orange-600">Dashboard</span>
                  </a>
                )}
              </div>

              {(hasRole("STUDENT") || hasRole("ADMIN")) && (
                <button
                  onClick={() => setApplicationModalVisible(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                  aria-label="Apply as Instructor"
                >
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span className="font-medium text-green-600">Apply as Instructor</span>
                </button>
              )}
            </div>

            <button
              onClick={logoutAndRedirect}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors mt-4"
              aria-label="Logout"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium text-red-600">Logout</span>
            </button>
          </div>
        </aside>

          <main className="w-full md:w-2/3">
            {loadingStats ? (
              <div className="flex items-center justify-center h-64">
                Loading chart...
              </div>
            ) : stats ? (
              <div className="flex flex-col gap-4 md:p-4 ">
                
                <div className="flex md:flex-row gap-4">
                  <div className="flex-1  flex items-start justify-start">
                    
                    <UserAchievements />
                  </div>
                  <div className="flex-1 py-4 h-[200px] flex items-end justify-end">
                  <SmartPieChart
                      data={[
                        {
                          name: "Courses",
                          value: stats?.completedCourses === 0 ? 0 : stats?.completedCourses,
                          color: "#FBC02D",
                        },
                        {
                          name: "Modules",
                          value: stats?.completedModules === 0 ? 0 : stats?.completedModules,
                          color: "#4CAF50",
                        },
                        {
                          name: "Lessons",
                          value: stats?.completedLessons === 0 ? 0 : stats?.completedLessons,
                          color: "#64B5F6",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="mt-10 px-1">
                 
                  <div className="overflow-auto h-full">
                    <CalendarContributionChart data={chartData} />
                  </div>
                </div>
                <div className="">
                  <div>
                    <CoursesTabs showPublished />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                No data available
              </div>
            )}
          </main>
        </div>
      </div>

      <AvatarUploader
        visible={uploaderVisible}
        onClose={() => setUploaderVisible(false)}
        currentAvatar={user.avatarUrl || "https://via.placeholder.com/128"}
        userId={Number(user.id)}
        onAvatarUploaded={() => {}}
      />
      <AddApplicationModal
        visible={applicationModalVisible}
        onClose={() => setApplicationModalVisible(false)}
        userId={user.id.toString()}
      />
    </>
  );
}
