"use client";

import { useState, useEffect } from "react";
import { getUserAchievements } from "@/services/api/apiRequests";
import type { UserAchievements } from "@/services/types";
import Image from "next/image";

export default function UserAchievements() {
    const [achievements, setAchievements] = useState<UserAchievements[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const data = await getUserAchievements();
                setAchievements(data);
            } catch (err) {
                setError("Failed to load achievements. Please try again later.");
                console.error("Error fetching achievements:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    if (loading) {
        return (
            <div className="w-full text-center text-gray-500 py-4">
                Loading achievements...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full text-center text-red-500 py-4">
                {error}
            </div>
        );
    }

    if (!achievements.length) {
        return (
            <div className="w-full text-center text-gray-500 py-4">
                No achievements yet.
            </div>
        );
    }

    return (
        <div className="w-full p-2 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Achievements</h2>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {achievements.map((achievement) => {
                    const iconName = `${achievement.name.replace(/\s+/g, '').toLowerCase()}${achievement.level}.webp`;
                    const iconPath = `/img/icons/achievements/${iconName}`;
                    const tooltipText = `${achievement.name} - ${achievement.level}\n${achievement.description}\nAwarded: ${new Date(achievement.awardedAt).toLocaleDateString()}`;

                    return (
                        <div
                            key={`${achievement.userId}-${achievement.achievementId}`}
                            className="relative group flex items-center justify-center"
                        >
                            <div className="relative w-32 h-32 flex items-center justify-center overflow-hidden pentagon group-hover:shadow-lg group-hover:scale-105 transition-transform duration-200">
                                <Image
                                    src={iconPath}
                                    alt={`${achievement.name} ${achievement.level}`}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                />
                            </div>
                            <div
                                className="absolute z-10 hidden group-hover:block group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out bg-gray-800 text-white text-sm p-2 rounded shadow-lg whitespace-pre-line top-full  left-1/2 transform -translate-x-1/2"
                                style={{ width: "max-content" }}
                            >
                                {tooltipText}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const styles = `
    .pentagon {
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    }
`;

if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}