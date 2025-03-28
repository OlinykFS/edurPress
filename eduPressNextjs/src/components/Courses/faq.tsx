"use client";

import { FAQs } from "@/services/types";
import { useState, useEffect } from "react";
import Accordion from "../Layout/Main/Accordion";
import { getFaqsForCourse } from "@/services/api/apiRequests";


interface FAQsProps {
  courseId: number;
}

function FAQItem({ faq }: { faq: FAQs }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      title={faq.question}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className="text-gray-700">
        {faq.answer}
      </div>
    </Accordion>
  );
}

export default function CoursesFAQs({ courseId }: FAQsProps) {
  const [faqs, setFaqs] = useState<FAQs[]>([]);
  const [error, setError] = useState("");

  async function fetchFaqs() {
    try {
      const data = await getFaqsForCourse(courseId);
      setFaqs(data);
    } catch (err) {
      console.error("Error fetching faqs:", err);
      setError("An error occurred while fetching the FAQs.");
    }
  }

  useEffect(() => {
    fetchFaqs();
  }, [courseId]);

  return (
    <div className="max-w-3xl mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {faqs.length === 0 && !error ? (
        <div className="text-gray-500">No FAQs available for this course.</div>
      ) : (
        faqs.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))
      )}
    </div>
  );
}
