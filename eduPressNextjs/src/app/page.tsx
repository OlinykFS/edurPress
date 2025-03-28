import HeroSection from "@/components/Layout/HeroSection/heroSection";
import TopCategories from "@/components/Category/topCategories";
import TopCourses from "@/components/Courses/topCourses";
import MetricSection from "@/components/Layout/Main/MetricSection";
import LatestArticles from "@/components/Article/latestArticles";
import StudentFeedbacks from "@/components/Layout/Main/StudentFeedbacks";
export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col flex-grow font-sans">
        <HeroSection />
        <TopCategories />
        <TopCourses />
        <MetricSection/>
        <StudentFeedbacks/>
        <LatestArticles/>
        
      </main>
    </div>
  );
}