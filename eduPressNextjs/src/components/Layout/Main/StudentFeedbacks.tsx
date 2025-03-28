"use client";
import FeedbackCard from "../Cards/FeedbackCard";
import MainCardLayout from "./MainCardLayout";



const feedbacks = [
  {
    id: 1,
    quote:
      "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound.",
    author: "Roe Smith",
    role: "Designer",
  },
  {
    id: 2,
    quote:
      "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound.",
    author: "Jane Doe",
    role: "Developer",
  },
  {
    id: 3,
    quote:
      "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound.",
    author: "John Doe",
    role: "Manager",
  },
  {
    id: 4,
    quote:
      "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound.",
    author: "Alice Johnson",
    role: "Designer",
  },
];

export default function StudentFeedbacks() {
  return (
    <div className="mt-24 px-4">
      <MainCardLayout
        title="Student Feedbacks"
        showAllName="All Feedbacks"
        description="What our students say about us"
        showAllLink="/feedbacks"
        gridColumns="grid-cols-1 lg:grid-cols-4"
        gridGap="gap-4"
      >
        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </MainCardLayout>
    </div>
  );
}