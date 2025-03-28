"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getHeroCategories } from "@/services/api/apiRequests";
import { Category } from "@/services/types";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";
import "swiper/css";

export default function TopCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();

    const fetchCategories = async () => {
        try {
            const result = await getHeroCategories();
            setCategories(result);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId: number) => {
        router.push(`/courses/${categoryId}`);
    };

    return (
        <section className="mx-auto mt-24 px-4 w-full max-w-[1290px]">
            <div className="flex md:flex-row justify-between items-center">
                <div className="flex flex-col gap-[12px]">
                    <h2 className="font-semibold text-3xl">Top Categories</h2>
                    <p className="text-[18px]">Explore our Popular Categories</p>
                </div>
                <div className="">
                    <a
                        href="/courses"
                        className="flex items-center gap-2 border-[1px] hover:bg-black px-5 py-[10px] border-black border-solid rounded-full text-sm sm:text-base hover:text-white transition-all duration-150"
                    >
                        <span className="sm:inline hidden">All Categories</span>
                        <FaArrowRight className="sm:hidden" />
                    </a>
                </div>
            </div>
            <div className="mt-12">
                <div className="md:block hidden">
                    <div className="gap-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="flex flex-col justify-center items-center border-[#EAEAEA] border-[1px] hover:shadow-xl border-solid rounded-2xl w-[234px] h-[234px] text-center hover:text-orange-400 transition-all hover:-translate-y-5 duration-300 cursor-pointer"
                            >
                                <div className="mb-4">
                                    <Image
                                        src={`/img/icons/categoryIcons/${category.iconName}`}
                                        alt={`${category.iconName} icon`}
                                        width={32}
                                        height={32}
                                        quality={100}
                                        style={{ width: "32px", height: "32px" }}
                                    />
                                </div>
                                <p className="font-semibold text-[20px] text-sm sm:text-base">{category.name}</p>
                                <p className="text-[18px] text-sm sm:text-base">{category.countOfCourses} Courses</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="block md:hidden">
                    <Swiper
                        breakpoints={{
                            320: {
                                slidesPerView: 1.3,
                                spaceBetween: 16,
                            },
                            360: {
                                slidesPerView: 1.6,
                                spaceBetween: 16,
                            },
                            460: {
                                slidesPerView: 2.5,
                                spaceBetween: 22,
                            },
                            640: {
                                slidesPerView: 3.3,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 3.3,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 4.5,
                                spaceBetween: 16,
                            },
                        }}
                        className="mySwiper"
                    >
                        {categories.slice(0, 10).map((category) => (
                            <SwiperSlide key={category.id}>
                                <div
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="flex flex-col justify-center items-center border-[#EAEAEA] border-[1px] hover:shadow-xl border-solid rounded-2xl w-full min-w-[170px] max-w-[234px] h-full min-h-[170px] max-h-[234px] text-center hover:text-orange-400 transition-all hover:-translate-y-5 duration-300 cursor-pointer"
                                >
                                    <div className="mb-4">
                                        <Image
                                            src={`/img/icons/categoryIcons/${category.iconName}`}
                                            alt={`${category.iconName} icon`}
                                            width={32}
                                            height={32}
                                            quality={100}
                                            style={{ width: "32px", height: "32px" }}
                                        />
                                    </div>
                                    <p className="font-semibold text-[16px] sm:text-[18px] md:text-[20px]">{category.name}</p>
                                    <p className="text-[14px] sm:text-[16px] md:text-[18px]">{category.countOfCourses} Courses</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
