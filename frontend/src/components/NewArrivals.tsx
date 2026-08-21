import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf } from "lucide-react";
import { Product } from "@/types/product"; // adjust path as needed

const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "T-shirt with Tape Details",
    image: "/images/clothes/image-1.png",
    rating: 4.5,
    price: 120,
  },
  {
    id: "2",
    title: "Skinny Fit Jeans",
    image: "/images/clothes/image-2.png",
    rating: 3.5,
    price: 240,
    originalPrice: 260,
    discountPercentage: -20,
  },
  {
    id: "3",
    title: "Checkered Shirt",
    image: "/images/clothes/image-3.png",
    rating: 4.5,
    price: 180,
  },
  {
    id: "4",
    title: "Sleeve Striped T-shirt",
    image: "/images/clothes/image-4.png",
    rating: 4.5,
    price: 130,
    originalPrice: 160,
    discountPercentage: -30,
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
        {rating}/<span className="text-gray-500">5</span>
      </span>
    </div>
  );
}

export default function NewArrivals() {
  return (
    <section className="w-[90%] max-w-7xl mx-auto px-4 py-12 md:py-16 border-t border-black/10">
      <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight text-black mb-10 md:mb-14 uppercase">
        New Arrivals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {PRODUCTS.map((product) => (
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
          href="/products"
          className="inline-block w-full sm:w-auto px-14 py-3.5 border border-black/10 rounded-full font-medium text-sm text-black hover:bg-black hover:text-white transition-colors duration-200"
        >
          View All
        </Link>
      </div>
    </section>
  );
}