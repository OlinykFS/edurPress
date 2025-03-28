"use client";

import { useEffect, useState } from "react";
import { Instructor } from "@/services/types";
import { fetchInstructor } from "@/handlers/Course/instructorHandlers";
import Image from "next/image";

interface InstructorInfoProps {
  instructorId: number;
}

const CACHE_KEY_PREFIX = "instructor_";
const CACHE_TTL = 24 * 60 * 60 * 1000;

const getInitials = (name: string): string => {
  if (!name) return "NA";
  const parts = name.split(" ");
  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

const getCachedData = (instructorId: number): Instructor | null => {
  const cacheKey = `${CACHE_KEY_PREFIX}${instructorId}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    } else {
      localStorage.removeItem(cacheKey);
    }
  }
  return null;
};

const saveDataToCache = (instructorId: number, data: Instructor) => {
  const cacheKey = `${CACHE_KEY_PREFIX}${instructorId}`;
  const cacheData = { data, timestamp: Date.now() };
  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
};

const clearOldCache = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(CACHE_KEY_PREFIX)) {
      const cachedData = localStorage.getItem(key);
      if (cachedData) {
        const { timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp > CACHE_TTL) {
          localStorage.removeItem(key);
        }
      }
    }
  });
};

const socialIconsMap: Record<string, string> = {
  FACEBOOK: "/img/icons/socials/FacebookIcon.svg",
  INSTAGRAM: "/img/icons/socials/InstagramIcon.svg",
  TWITTER: "/img/icons/socials/XIcon.svg",
  YOUTUBE: "/img/icons/socials/YouTubeIcon.svg",
  GITHUB: "/img/icons/socials/GithubIcon.svg",
  LINKEDIN: "/img/icons/socials/LinkedInIcon.svg",
};


export default function InstructorInfo({ instructorId }: InstructorInfoProps) {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadInstructor = async () => {
      setError(null);
      try {
        clearOldCache();
        const cachedData = getCachedData(instructorId);
        if (cachedData) {
          setInstructor(cachedData);
          setLoading(false);
          return;
        }
        const result = await fetchInstructor(instructorId);
        setInstructor(result);
        saveDataToCache(instructorId, result);
      } catch (e) {
        setError("Failed to load instructor: " + String(e));
      } finally {
        setLoading(false);
      }
    };

    if (instructorId) {
      loadInstructor();
    }
  }, [instructorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="border-[#FF782D] border-b-2 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="font-medium text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="font-medium text-red-500 text-xl">Instructor not found.</p>
      </div>
    );
  }

  return (
    <div className="flex sm:flex-row flex-col gap-6">
      <div className="flex justify-center items-center bg-black rounded-2xl w-32 sm:w-44 h-32 sm:h-44 text-white cursor-pointer overflow-hidden">
        {instructor.avatarUrl ? (
          <Image
            src={instructor.avatarUrl}
            alt="User Avatar"
            width={300}
            height={300}
            quality={100}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-bold text-7xl text-white">
            {getInitials(instructor.username)}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h2 className="mb-2 font-bold text-2xl text-gray-800">
          {instructor.username}
        </h2>
        <p className="mb-4 text-gray-600">{instructor.bio}</p>
        <div className="flex flex-wrap gap-2">
          Follow me: 
        {instructor.socialMedia.map((social, index) => {
            const socialKey = social.name.toUpperCase();
            const iconPath = socialIconsMap[socialKey];

            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:underline"
              >
                {iconPath ? (
                  <Image
                    src={iconPath}
                    alt={social.name}
                    width={24}
                    height={24}
                    quality={100}
                  />
                ) : (
                  <span>{social.name}</span>
                )}
              </a>
            );
          })}

        </div>
      </div>
    </div>
  );
}
