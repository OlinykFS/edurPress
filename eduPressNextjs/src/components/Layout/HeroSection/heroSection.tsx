import Image from "next/image";
import MainHero from "/public/img/MainHeroImg.png";
import HeroMainGirl from "/public/img/HeroMainGirl.png";


export default function HeroSection() {
   return (
      <div className="font-exo relative w-full h-[700px] max-lg:h-[500px] overflow-hidden">
         <Image
         src={MainHero}
         alt="Background"
         fill
         style={{ objectFit: 'cover' }}
         quality={100}
         priority
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"/>

         <div className="absolute inset-0 flex justify-evenly items-center pl-72">
            <h2 className="opacity-60 font-extrabold text-[#f8fff3] text-[220px] text-start uppercase leading-[0.9] select-none">
               <span className="font-frijole">Online<br />School</span>
            </h2>
         </div>
         <div className="relative flex items-center mx-auto px-4 max-w-[1290px] h-full">
            <div className="z-10 max-w-lg max-h-64">
               <h1 className="mb-4 text-5xl">Take Your Career to the Next Level</h1>
               <p className="mb-6 text-lg">
                  Join our expert-led online courses and unlock new opportunities. Gain in-demand skills from the comfort of your home!
               </p>
               <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold text-white transition duration-300">
                  Start Learning Now
               </button>
            </div>

            <div className="right-[-50px] bottom-0 absolute max-mdx:hidden w-[600px] h-full min-h-full max-h-[700px] max-lg:max-h-[500px]">
            <Image
            src={HeroMainGirl}
            alt="Girl"
            fill
            style={{
               objectFit: 'cover',
               objectPosition: 'bottom right',
               top: '0',
               zIndex: 1
            }}
            quality={100}
            priority
            className="h-full"
            sizes="(max-width: 768px) 0px, (max-width: 1200px) 50vw, 33vw"/>

            </div>
         </div>
      </div>
   );
};
