"use client";

import { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

interface Testimonial {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  comment: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    verified: true,
    rating: 5,
    comment:
      '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations."',
  },
  {
    id: "2",
    name: "Alex K.",
    verified: true,
    rating: 5,
    comment:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
  },
  {
    id: "3",
    name: "James L.",
    verified: true,
    rating: 5,
    comment:
      '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."',
  },
  {
    id: "4",
    name: "Mooen K.",
    verified: true,
    rating: 5,
    comment:
      '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."',
  },
  {
    id: "5",
    name: "Samantha D.",
    verified: true,
    rating: 5,
    comment:
      '"The customer service was top notch and the delivery was incredibly fast. I will definitely be ordering again very soon!"',
  },
];

export default function HomeRatingCustomers() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Manual arrow navigation controls
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Width of card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-black">
            OUR HAPPY CUSTOMERS
          </h2>

          {/* Manual Arrow Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous Testimonial"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors border border-black/10"
            >
              <FaArrowLeft className="text-sm md:text-base" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next Testimonial"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors border border-black/10"
            >
              <FaArrowRight className="text-sm md:text-base" />
            </button>
          </div>
        </div>

        {/* Infinite Auto-Marquee Wrapper */}
        <div
          ref={scrollContainerRef}
          className="relative w-full overflow-x-auto scrollbar-hide py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-5 w-max ${
              isPaused ? "[animation-play-state:paused]" : "animate-marquee"
            }`}
          >
            {/* Duplicated list x3 ensures smooth infinite looping with zero jump */}
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map(
              (item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="w-[310px] sm:w-[360px] md:w-[400px] flex-shrink-0 bg-white border border-black/10 rounded-[20px] p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Star Ratings */}
                    <div className="flex items-center gap-1 text-[#FFC633]">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} className="text-lg md:text-xl" />
                      ))}
                    </div>

                    {/* Name & Verification Badge */}
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-lg md:text-xl text-black">
                        {item.name}
                      </h3>
                      {item.verified && (
                        <IoCheckmarkCircle className="text-[#01AB31] text-xl" />
                      )}
                    </div>

                    {/* Comment */}
                    <p className="text-sm md:text-base text-black/60 leading-relaxed font-normal">
                      {item.comment}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

      </div>

      {/* Embedded Tailored Animation Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}