import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative w-full bg-[#F2F0F1]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row items-stretch justify-between px-4 sm:px-8 lg:px-16 pt-10 lg:pt-20">
          
          {/* Left Column: Typography & Stats */}
          <div className="z-10 max-w-[600px] flex-1 pb-10 lg:pb-20">
            {/* Main Heading */}
            <h1 className="font-bold text-[40px] leading-[44px] sm:text-[56px] sm:leading-[58px] lg:text-[64px] lg:leading-[64px] font-extrabold text-black tracking-tight uppercase">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-[14px] sm:text-[16px] leading-[22px] text-black/60 font-sans">
              Browse through our diverse range of meticulously crafted garments, designed
              to bring out your individuality and cater to your sense of style.
            </p>

            {/* CTA Button */}
            <a
              href="#shop"
              className="mt-8 inline-block w-full sm:w-[210px] rounded-full bg-black py-4 text-center font-sans text-[16px] font-medium text-white transition-all hover:bg-black/80"
            >
              Shop Now
            </a>

            {/* Social Proof / Metrics */}
            <div className="mt-12 flex flex-wrap items-center justify-between sm:justify-start sm:gap-[32px] gap-y-6">
              <div>
                <h3 className="text-[28px] sm:text-[40px] font-bold text-black leading-tight">
                  200+
                </h3>
                <p className="text-[12px] sm:text-[16px] text-black/60">
                  International Brands
                </p>
              </div>

              <div className="h-[52px] w-[1px] bg-black/10 hidden sm:block" />

              <div>
                <h3 className="text-[28px] sm:text-[40px] font-bold text-black leading-tight">
                  2,000+
                </h3>
                <p className="text-[12px] sm:text-[16px] text-black/60">
                  High-Quality Products
                </p>
              </div>

              <div className="h-[52px] w-[1px] bg-black/10 hidden sm:block" />

              <div>
                <h3 className="text-[28px] sm:text-[40px] font-bold text-black leading-tight">
                  30,000+
                </h3>
                <p className="text-[12px] sm:text-[16px] text-black/60">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image & Star Vectors */}
          <div className="relative flex-1 w-full min-h-[450px] lg:min-h-[600px] flex items-end">
            {/* Small Star Vector */}
            <div className="absolute top-[40%] left-0 lg:left-[20px] z-10 animate-pulse">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 0C28 15.464 15.464 28 0 28C15.464 28 28 40.536 28 56C28 40.536 40.536 28 56 28C40.536 28 28 15.464 28 0Z"
                  fill="black"
                />
              </svg>
            </div>

            {/* Large Star Vector */}
            <div className="absolute top-[10%] right-4 z-10 animate-pulse">
              <svg
                width="104"
                height="104"
                viewBox="0 0 104 104"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 0C52 28.7188 28.7188 52 0 52C28.7188 52 52 75.2812 52 104C52 75.2812 75.2812 52 104 52C75.2812 52 52 28.7188 52 0Z"
                  fill="black"
                />
              </svg>
            </div>

               {/* Main Couple Photo */}
            <div className="absolute inset-0 flex items-end justify-end overflow-hidden">
              <Image
                src="/images/Hero/trendy-fashionable-couple-posing.png"
                alt="Trendy fashionable couple posing"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-bottom object-right"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Black Brands Bar (Positioned directly below with no gaps) */}
      <div className="w-full bg-black min-h-[122px] py-6 flex items-center justify-center">
        <div className="mx-auto flex max-w-[1440px] w-full flex-wrap items-center justify-between gap-8 px-4 sm:px-8 lg:px-16 py-6">
          {/* Versace */}
          <div className="relative h-7 sm:h-9 w-32 sm:w-40 flex items-center justify-center">
            <Image
              src="/images/Hero/versace-logo.png"
              alt="Versace"
              width={160}
              height={36}
              className="object-contain brightness-0 invert"
            />
          </div>

          {/* Zara */}
          <div className="relative h-7 sm:h-9 w-24 sm:w-28 flex items-center justify-center">
            <Image
              src="/images/Hero/zara-logo.png"
              alt="Zara"
              width={112}
              height={36}
              className="object-contain brightness-0 invert"
            />
          </div>

          {/* Gucci */}
          <div className="relative h-7 sm:h-9 w-28 sm:w-36 flex items-center justify-center">
            <Image
              src="/images/Hero/gucci-logo.png"
              alt="Gucci"
              width={144}
              height={36}
              className="object-contain brightness-0 invert"
            />
          </div>

          {/* Prada */}
          <div className="relative h-7 sm:h-9 w-28 sm:w-36 flex items-center justify-center">
            <Image
              src="/images/Hero/prada-logo.png"
              alt="Prada"
              width={144}
              height={36}
              className="object-contain brightness-0 invert"
            />
          </div>

          {/* Calvin Klein */}
          <div className="relative h-7 sm:h-9 w-36 sm:w-44 flex items-center justify-center">
            <Image
              src="/images/Hero/calvin-logo.png"
              alt="Calvin Klein"
              width={176}
              height={36}
              className="object-contain brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </>
  );
}