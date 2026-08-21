import Image from "next/image";
import Link from "next/link";

interface StyleCategory {
  id: string;
  title: string;
  href: string;
  image: string;
  colSpan: string; // Tailwind class to manage asymmetrical widths
}

const CATEGORIES: StyleCategory[] = [
  {
    id: "casual",
    title: "Casual",
    href: "/category/casual",
    image: "/images/Hero/Casual.png",
    colSpan: "lg:col-span-4",
  },
  {
    id: "formal",
    title: "Formal",
    href: "/category/formal",
    image: "/images/Hero/Formal.png",
    colSpan: "lg:col-span-8",
  },
  {
    id: "party",
    title: "Party",
    href: "/category/party",
    image: "/images/Hero/Party.png",
    colSpan: "lg:col-span-8",
  },
  {
    id: "gym",
    title: "Gym",
    href: "/category/gym",
    image: "/images/Hero/Gym.png",
    colSpan: "lg:col-span-4",
  },
];

export default function DressStyle() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Container Box */}
      <div className="bg-[#F0EEED] rounded-[40px] px-6 py-10 md:px-16 md:py-16">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight text-black mb-8 md:mb-16 uppercase">
          Browse By Dress Style
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`relative h-[190px] sm:h-[240px] md:h-[289px] bg-white rounded-[20px] overflow-hidden group block transition-shadow duration-300 hover:shadow-md ${category.colSpan}`}
            >
              {/* Category Title */}
              <span className="absolute top-4 left-6 sm:top-6 sm:left-9 z-10 font-bold text-2xl sm:text-3xl lg:text-4xl text-black">
                {category.title}
              </span>

              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-right-top transition-transform duration-500 ease-out group-hover:scale-105"
                priority
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}