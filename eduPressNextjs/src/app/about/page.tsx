"use client";

import { useState } from "react";
import Accordion from "@/components/Layout/Main/Accordion";
import Image from "next/image";

interface FAQBlock {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQBlock[] = [
  {
    id: 1,
    question: "How do I become an instructor on EduPress?",
    answer:
      "At EduPress, we empower everyone. Join our platform to share your expertise with a global audience. Our quick registration and verification process gets you recognized as a leader. Once you're in, you can create and publish courses that inspire and transform lives.",
  },
  {
    id: 2,
    question: "How can I purchase a course?",
    answer:
      "Purchasing a course on EduPress is smooth and hassle-free. Browse our wide catalog—from programming to business strategy—and secure lifetime access to premium content curated by top experts.",
  },
  {
    id: 3,
    question: "How do I enroll in a free course?",
    answer:
      "Our free courses are tailor-made for those hungry to learn without spending a dime. Just sign up, pick a free course, and dive into a treasure trove of high-quality content to boost your skills.",
  },
  {
    id: 4,
    question: "Where can I find the latest news and educational materials?",
    answer:
      "Stay ahead with our news section – a hub for cutting-edge educational resources. From in-depth articles to slick video tutorials, our content keeps you informed and inspired every day.",
  },
  {
    id: 5,
    question: "What is EduPress all about?",
    answer:
      "EduPress bridges the gap between learners and educators. Whether you're here to teach or learn, our dynamic ecosystem offers diverse courses, invaluable insights, and a community driven by success.",
  },
  {
    id: 6,
    question: "How do I access courses provided directly by EduPress?",
    answer:
      "Our exclusive courses are crafted by top experts, offering real-world insights and actionable knowledge. Whether you're upgrading your skills or exploring new fields, these courses are designed to empower you.",
  },
];

export default function FAQPage() {
  const [openFAQId, setOpenFAQId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => setOpenFAQId((prev) => (prev === id ? null : id));
  const leftColumn = faqs.filter((_, index) => index % 2 === 0);
  const rightColumn = faqs.filter((_, index) => index % 2 !== 0);

  return (
    <div className="mt-[45px] mx-auto px-4 max-w-[1290px]">
      <div className="">
        <h1 className="mb-8 font-bold text-4xl">FAQ</h1>
        <div className="block md:hidden">
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              title={faq.question}
              isOpen={openFAQId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            >
              <p>{faq.answer}</p>
            </Accordion>
          ))}
        </div>
        <div className="md:flex gap-4 hidden">
          <div className="flex-1">
            {leftColumn.map((faq) => (
              <Accordion
                key={faq.id}
                title={faq.question}
                isOpen={openFAQId === faq.id}
                onToggle={() => toggleFAQ(faq.id)}
              >
                <p>{faq.answer}</p>
              </Accordion>
            ))}
          </div>
          <div className="flex-1">
            {rightColumn.map((faq) => (
              <Accordion
                key={faq.id}
                title={faq.question}
                isOpen={openFAQId === faq.id}
                onToggle={() => toggleFAQ(faq.id)}
              >
                <p>{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-14 max-w-[500px]">
        <Image
          src="/img/FaqsImage.png"
          alt="Faq image"
          width={500}
          height={330}
          className="w-full h-auto object-contain"
        />
      </div>

    </div>
  );
}
