import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf } from "lucide-react";
import { Product } from "@/types/product";

const TOP_SELLING_PRODUCTS: Product[] = [
  {
    id: "5",
    title: "Vertical Striped Shirt",
    image: "/images/clothes/Frame1.png",
    rating: 5.0,
    price: 212,
    originalPrice: 232,
    discountPercentage: -20,
  },
  {
    id: "6",
    title: "Courage Graphic T-shirt",
    image: "/images/clothes/Frame2.png",
    rating: 4.0,
    price: 145,
  },
  {
    id: "7",
    title: "Loose Fit Bermuda Shorts",
    image: "/images/clothes/Frame3.png",
    rating: 3.0,
    price: 80,
  },
  {
    id: "8",
    title: "Faded Skinny Jeans",
    image: "/images/clothes/Frame4.png",
    rating: 4.5,
    price: 210,
  },
];

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 stroke-none" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-200 fill-gray-200 stroke-none" />
            <StarHalf className="w-4 h-4 text-amber-400 fill-amber-400 stroke-none absolute top-0 left-0" />
          </div>
        )}
      </div>
      <span className="text-xs text-black font-medium ml-1">
        {rating.toFixed(1)}/<span className="text-gray-500">5</span>
      </span>
    </div>
  );
}

export default function TopSelling() {
  return (
    <section className="w-[90%] max-w-7xl mx-auto px-4 py-12 md:py-16 border-t border-black/10">
      <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight text-black mb-10 md:mb-14 uppercase">
        Top Selling
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {TOP_SELLING_PRODUCTS.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden mb-4 flex items-center justify-center p-6">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-out"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-grow">
              <h3 className="font-bold text-base md:text-lg text-black leading-tight line-clamp-1">
                {product.title}
              </h3>

              <RatingStars rating={product.rating} />

              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-xl md:text-2xl text-black">
                  ${product.price}
                </span>

                {product.originalPrice && (
                  <span className="font-bold text-xl md:text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}

                {product.discountPercentage && (
                  <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs font-medium px-2.5 py-1 rounded-full">
                    {product.discountPercentage}%
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-9 text-center">
        <Link
          href="/products?sort=top-selling"
          className="inline-block w-full sm:w-auto px-14 py-3.5 border border-black/10 rounded-full font-medium text-sm text-black hover:bg-black hover:text-white transition-colors duration-200"
        >
          View All
        </Link>
      </div>
    </section>
  );
}