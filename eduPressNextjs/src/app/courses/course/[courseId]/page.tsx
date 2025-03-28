"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Course } from "@/services/types";
import { useAuth } from "@/app/context/authContext";
import { fetchCourse } from "@/handlers/Course/getCourse";
import { handleEnrollToCourse } from "@/handlers/Course/courseEnrollmentsHandlers";
import CommentForm from "@/components/Comments/CommentsForm";
import CommentList from "@/components/Comments/CommentsList";
import CurriculumInfo from "@/components/Courses/CurriculumInfo";
import InstructorInfo from "@/components/Courses/InstructorInfo";
import FAQs from "@/components/Courses/faq";
import CourseOverview from "@/components/Courses/courseOverview";

const TABS = ["Overview", "Curriculum", "Instructor", "FAQs", "Reviews"] as const;

export default function CourseDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>(TABS[0]);

  const courseId = searchParams.get("id");
  const courseIdNumber = Number(courseId);

  useEffect(() => {
    const loadCourseData = async () => {
      if (!courseId) {
        setError("Course ID is missing");
        setLoading(false);
        return;
      }

      try {
        await fetchCourse(courseIdNumber, setCourse, setError);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId, courseIdNumber]);

  const handleEnrollClick = async () => {
    if (!course) {
      setError("Course data is missing");
      return;
    }

    if (!course.freeCourse) {
      router.push(`/checkout?id=${course.id}`);
      return;
    }

    if (!user?.id) {
      setError("You need to log in to enroll in the course.");
      return;
    }

    try {
      await handleEnrollToCourse(
        course.id,
        setError
      );
      setCourse(prev => prev ? { ...prev, userEnrolled: true } : null);
    } catch (e) {
      console.error("Enrollment failed:", e);
      setError("Failed to enroll in the course. Please try again.");
    }
  };

  const renderEnrollButton = () => {
    if (course?.userEnrolled) {
      return(
       <span className="w-auto font-semibold text-green-500">
          ✔ Enrolled
       </span>
       )
    }

    if (course?.hasPendingPayment) {
      return (
        <span className="font-semibold text-yellow-500">
          ⏳ Pending Payment
        </span>
      );
    }

    return (
      <button
        className="bg-[#FF782D] hover:bg-[#FF682D] px-3 py-3 rounded-xl text-white transition-colors"
        onClick={handleEnrollClick}
      >
        Enroll Now
      </button>
    );
  };

  const renderCourseDetails = () => (
    <div className="relative bg-black h-[290px]">
      <div className="flex items-center mx-auto px-4 max-w-7xl h-full">
        <div className="text-white">
          <div className="inline-flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-[#555] px-3 py-1 rounded-md text-sm text-white uppercase">
              {course?.categoryName || "Category"}
            </span>
            <p className="text-gray-500 text-lg">
              by {course?.instructorName || "Unknown Author"}
            </p>
          </div>
          <h1 className="mb-6 font-bold text-3xl md:text-4xl">
            {course?.title}
          </h1>
          <ul className="flex flex-wrap gap-4 md:gap-6 text-[#9D9D9D] text-sm md:text-base">
            {[
              { icon: "timeIcon.svg", text: `${course?.duration} Weeks` },
              { icon: "studentIcon.svg", text: `${course?.studentsCount} Students` },
              { icon: "levelIcon.svg", text: `${course?.difficulty} Level` },
              { icon: "lessonIcon.svg", text: `${course?.modulesCount} Modules` },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Image
                  src={`/img/icons/courseIcons/${item.icon}`}
                  alt={item.text.split(' ')[0]}
                  width={16}
                  height={16}
                />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (!course) return null;

    const tabComponents = {
      Overview: <CourseOverview courseId={course.id} />,
      Curriculum: <CurriculumInfo courseId={course.id} />,
      Instructor: <InstructorInfo instructorId={course.instructorId} />,
      FAQs: <FAQs courseId={course.id} />,
      Reviews: <CommentList courseId={courseIdNumber} />,
    };

    return tabComponents[activeTab];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-[#FF782D] border-b-2 rounded-full w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">
          {error || "Course not found."}
        </p>
      </div>
    );
  }

  return (
    <section className="relative">
  {renderCourseDetails()}

  <div className="mx-auto mt-8 max-w-7xl">
    <div className="flex mdx:flex-row flex-col lg:gap-14">
      <div className="flex-1 order-2 mdx:order-1 min-w-0">
        <div className="border-gray-200 border-b">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`relative py-3 md:px-6 md:py-4 text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap 
                  ${
                    activeTab === tab
                      ? "text-orange-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 p-4 min-h-[300px]">
          {renderTabContent()}
        </div>
      </div>
      <div className="lg:top-8 pr-2 md:pl-2 z-10 lg:sticky order-1 mdx:order-2 -mt-[80px] mdx:-mt-[230px] mb-8 md:mb-0 w-[300px] mdx:w-[35%] min-md:w-[30%] lg:w-[30%] h-[370px] transition-all duration-300">
        <div className="border-gray-200 bg-white shadow-sm border rounded-lg">
          <Image
            src={course.imageUrl || "/img/courseImageNotFound.jpg"}
            alt={course.title || "Course image"}
            width={410}
            height={310}
            className="rounded-t-lg w-full h-[270px] object-cover"
            priority
          />
          <div className="flex items-center gap-4 ">
            {!course.userEnrolled && (
              <div className="flex-grow font-semibold">
                {course.discount! > 0 && (
                  <span className="text-gray-400 text-sm line-through">
                    ${course.discount}.00
                  </span>
                )}
                <span className="block text-lg text-orange-500">
                  ${course.price}.00
                </span>
              </div>
            )}
            <div className="w-full py-4 flex justify-center">
              {renderEnrollButton()}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8">
      
      <CommentForm courseId={courseIdNumber} />
    </div>
  </div>
</section>
  );
}