"use client";
import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaArrowRight } from "react-icons/fa";
import React from "react";

interface CardLayoutProps {
  title?: string;
  description?: string;
  showAllName?: string;
  showAllLink?: string;
  showAll?: boolean;
  children: ReactNode;
  error?: string | null;
  isSwiperEnabled?: boolean;
  gridColumns?: string;
  gridGap?: string;
}

export default function MainCardLayout({
  title,
  description,
  showAllLink,
  showAllName,
  showAll,
  children,
  error,
  isSwiperEnabled = true,
  gridColumns = "grid-cols-1 mdx:grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
  gridGap = "gap-2",
}: CardLayoutProps) {
  return (
    <section className="mx-auto px-4 w-full max-w-[1290px]">
      <div className="flex md:flex-row justify-between items-center mb-12">
        <div className="flex flex-col gap-[12px]">
          <h2 className="font-semibold text-3xl">{title}</h2>
          <p className="text-[18px]">{description}</p>
        </div>
        {showAll === true && (
          
        <div className="mt-4 sm:mt-0">
          <a
            href={showAllLink}
            className="flex items-center gap-2 hover:bg-black px-5 py-[10px] border border-black rounded-full text-sm sm:text-base hover:text-white transition-all duration-150"
          >
            <span className="sm:inline hidden">{showAllName}</span>
            <FaArrowRight className="sm:hidden" />
          </a>

        </div>
         )}
      </div>
       
      <div className="mt-12">
        {error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : (
          <>
           <div className="lg:block hidden">
              <div className={`grid ${gridColumns} ${gridGap} justify-items-center`}>
                {children}
              </div>
            </div>
            {isSwiperEnabled && (
              <div className="block lg:hidden"> 
                <Swiper
                  breakpoints={{
                    320: {
                      slidesPerView: 1.1,
                      spaceBetween: 16,
                    },
                    480: {
                      slidesPerView: 1.3,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 1.6,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2.5,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 3.2,
                      spaceBetween: 32,
                    },
                  }}
                  className="px-4 mySwiper"
                >
                  {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index}>
                      <div className="py-3 h-full">{child}</div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            
          </>
        )}
      </div>
    </section>
  );
}
