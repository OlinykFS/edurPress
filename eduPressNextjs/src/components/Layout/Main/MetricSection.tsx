import Image from "next/image";

export default function MetricSection() {
  return (
    <div>
      <section className="mx-auto mt-20 p-4 w-full max-w-[1290px] overflow-hidden">
        <div className="relative rounded-lg w-full h-[300px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/img/banner.png"
              alt="banner"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="object-left rounded-lg"
            />
          </div>
          <div className="absolute inset-0 flex justify-start items-center pr-8 pl-8 md:pl-12">
            <div className="max-w-[500px]">
              <h2 className="mb-4 font-bold text-2xl text-gray-800 md:text-[32px]">
                Unlock Your Potential with Us!
              </h2>
              <p className="mb-6 font-normal text-base text-gray-700 md:text-[18px]">
                Transform your life today! Buy a course, master new skills, and
                achieve your dreams faster than ever.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg text-white transition-colors duration-300">
                Let's start now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-8 p-4 w-full max-w-[1290px]">
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-center items-center gap-4 bg-[#EAEAEA] p-5 rounded-lg w-full h-[180px]">
            <span className="font-bold text-4xl text-orange-500">25K+</span>
            <span className="text-center text-gray-600 text-lg">
              Active Students
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 bg-[#EAEAEA] p-5 rounded-lg w-full h-[180px]">
            <span className="font-bold text-4xl text-orange-500">899</span>
            <span className="text-center text-gray-600 text-lg">
              Total Courses
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 bg-[#EAEAEA] p-5 rounded-lg w-full h-[180px]">
            <span className="font-bold text-4xl text-orange-500">158</span>
            <span className="text-center text-gray-600 text-lg">
              Instructors
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 bg-[#EAEAEA] p-5 rounded-lg w-full h-[180px]">
            <span className="font-bold text-4xl text-orange-500">100%</span>
            <span className="text-center text-gray-600 text-lg">
              Satisfaction Rate
            </span>
          </div>
        </div>
        <div className="flex mdx:flex-row flex-col gap-8 md:gap-8 mx-auto mt-24 px-4 max-w-[1290px]">
          <div className="flex-1 min-w-[270px] max-w-[540px] md:max-w-[70%]">
            <Image
              src="/img/MetricImage.png"
              alt="metricImage"
              width={640}
              height={459}
              quality={100}
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 min-w-[290px] max-w-full min-mdx:max-w-full">
            <h2 className="font-semibold text-2xl md:text-3xl">
              Transform Your Skills, Transform Your Future
            </h2>
            <p className="pt-7 text-base text-gray-600 md:text-[18px]">
              Take control of your career. Discover expert-led courses, gain
              in-demand skills, and unlock new opportunities. Your journey to
              success starts here.
            </p>
            <ul className="flex flex-col gap-4 pt-5">
              {[
                "Certification upon completion",
                "Expert-led courses",
                "Flexible learning schedule",
                "Lifetime access to resources",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg
                    width="13"
                    height="10"
                    viewBox="0 0 13 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5001 7.78002L1.7201 5.00002L0.773438 5.94002L4.5001 9.66668L12.5001 1.66668L11.5601 0.726685L4.5001 7.78002Z"
                      fill="#55BE24"
                    />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href="/courses"
                className="inline-block bg-orange-500 hover:bg-orange-400 px-8 py-4 rounded-full text-white transition-all duration-300 cursor-pointer"
              >
                Explore courses
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-20  w-full max-w-[1290px] overflow-hidden">
          <div className="relative rounded-lg w-full h-[350px] md:h-[350px] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/img/StartWithUsBanner.png"
                alt="banner"
                fill
                style={{ objectFit: "cover" }}
                quality={100}
                className="rounded-2xl"
              />
            </div>
            <div className="absolute inset-0 flex sm:flex-row flex-col justify-around xmls:justify-between items-center gap-0 sm:gap-8 md:gap-2 sm:p-4 md:p-8">
              <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8 text-center md:text-left">
                <Image
                  src="/img/MetricStudentAvatar.png"
                  alt="StudentAvatar"
                  width={140}
                  height={140}
                  className="mx-4 rounded-full w-32 md:w-[140px] h-30 md:h-[140px]"
                />
                <h3 className="font-semibold text-[18px] text-black md:text-[24px]">
                  Let’s Start With Us
                </h3>
              </div>
              <div className="flex md:flex-row flex-col gap-2 mt-4 md:mt-0 px-2 pb-2 w-full md:w-auto md:text-[14px]">
                <a
                  href="#"
                  className="flex-1 md:flex-none border-2 border-orange-500 hover:bg-orange-300 px-4 md:px-6 py-2 md:py-3 rounded-full text-center text-orange-500 transition-colors duration-300"
                >
                  I'm A Student
                </a>
                <a
                  href="#"
                  className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 px-4 md:px-6 py-2 md:py-3 rounded-full text-center text-white transition-colors duration-300"
                >
                  Become An Instructor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
