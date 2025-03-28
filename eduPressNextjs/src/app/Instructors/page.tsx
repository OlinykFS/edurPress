"use client";
import { useState } from "react";
import Image from "next/image";

export default function InstructorFaqs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "GET STARTED",
    "RULES",
    "COURSES"
  ];

  const tabContent = [
    {
      title: "Become a Certified Instructor",
      content: [
        "Create your instructor profile",
        "Verify your professional credentials",
        "Complete the teaching certification",
        "Submit background check documents",
        "Set up payment information"
      ]
    },
    {
      title: "Teaching Guidelines",
      content: [
        "Maintain 4.5+ average course rating",
        "Respond to student questions within 48h",
        "Update content annually for relevance",
        "Follow copyright and privacy policies",
        "Adhere to community guidelines"
      ]
    },
    {
      title: "Course Requirements",
      content: [
        "Minimum 2 hours of video content",
        "HD quality (720p+) production",
        "Interactive quizzes & exercises",
        "Downloadable resources",
        "Closed captions for all videos"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <main className="mx-auto px-4 py-12 max-w-[1290px] container">
        <div className="gap-8 grid md:grid-cols-2 mb-20">
          <div className="relative w-full aspect-square">
            <Image
              src="/img/teacher-1.jpeg"
              alt="Teaching concept"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex mb-8 border-b">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-4 text-lg ${
                    activeTab === index
                      ? "text-orange-600 border-b-2 border-orange-600 font-black"
                      : "text-gray-500 hover:text-gray-700 font-bold"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="pt-4">
              <h3 className="mb-6 font-bold text-2xl">
                {tabContent[activeTab].title}
              </h3>
              <ul className="space-y-4">
                {tabContent[activeTab].content.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start text-gray-600"
                  >
                    <svg 
                      className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-orange-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="gap-8 grid md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-bold text-3xl">START TEACHING TODAY</h2>
            <p className="text-gray-600 text-lg">
              Join our network of 50,000+ instructors reaching over 25 million students worldwide. 
              Share your expertise, build your brand, and earn money on your schedule.
            </p>
            <button className="bg-black hover:bg-orange-600 px-8 py-3.5 font-bold text-lg text-white transition-colors">
              LAUNCH YOUR FIRST COURSE
            </button>
          </div>

          <div className="relative w-full aspect-square">
            <Image
              src="/img/teacher-2.webp"
              alt="Course creation"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}