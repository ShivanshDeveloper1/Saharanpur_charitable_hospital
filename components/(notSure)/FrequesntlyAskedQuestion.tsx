
"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What orthopedic problems do you treat?",
    answer:
      "We provide care for knee pain, arthritis, fractures, sports injuries, joint problems, and other bone-related conditions. Our team helps patients understand their condition and available treatment options.",
  },
  {
    question: "When should I consult an orthopedic doctor?",
    answer:
      "You should consider consulting an orthopedic doctor if you have persistent joint pain, swelling, difficulty walking, restricted movement, or an injury that is not improving.",
  },
  {
    question: "Do I need an appointment before visiting?",
    answer:
      "Booking an appointment in advance can help reduce waiting time and make your visit more convenient. Please contact our hospital team to confirm appointment availability.",
  },
  {
    question: "What should I bring to my consultation?",
    answer:
      "Please bring any previous medical reports, X-rays, MRI or other scan results, current medication details, and relevant prescriptions to help the doctor assess your condition.",
  },
];

const FrequesntlyAskedQuestion = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

        {/* Left heading */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="mb-4 inline-flex items-center rounded-full border border-medical-line/20 bg-medical-blue px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-medical-line">
            Patient Support
          </span>

          <h2 className="max-w-md text-3xl font-bold leading-tight text-text-dark sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="text-medical-line">Questions</span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-text-muted">
            Have questions about your orthopedic care? Find helpful answers
            before planning your visit.
          </p>

          <div className="mt-8 hidden h-1 w-16 rounded-full bg-accent-red lg:block" />
        </div>

        {/* Right accordion */}
        <div className="divide-y divide-medical-line/15 border-y border-medical-line/20">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);

            return (
              <div key={faq.question} className="py-1">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="group flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                >
                  <span
                    className={`text-base font-semibold leading-7 transition-colors sm:text-lg ${
                      isOpen
                        ? "text-medical-line"
                        : "text-text-dark group-hover:text-medical-line"
                    }`}
                  >
                    <span className="mr-3 text-sm font-medium text-text-muted/70">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </span>

                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isOpen
                        ? "border-medical-line bg-medical-line text-white"
                        : "border-medical-line/20 bg-white text-medical-line group-hover:border-medical-line"
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={17} />
                    ) : (
                      <Plus size={17} />
                    )}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  hidden={!isOpen}
                  className="pb-6 pl-0 pr-12 sm:pl-10"
                >
                  <p className="max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FrequesntlyAskedQuestion;
