"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  HiStar,
  HiChevronRight,
  HiMinus,
  HiPlus,
  HiCheck,
} from "react-icons/hi2";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
}

const ALL_PRODUCTS: Record<string, Product> = {
  "1": {
    id: "1",
    title: "One Life Graphic T-Shirt",
    price: 260,
    originalPrice: 300,
    rating: 4.5,
    reviewsCount: 450,
    description:
      "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors: [
      { name: "Olive", hex: "#4F533E" },
      { name: "Forest", hex: "#314F4A" },
      { name: "Navy", hex: "#31344F" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/images/clothes/image-1.png",
      "/images/clothes/image-2.png",
      "/images/clothes/image-3.png",
    ],
  },
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const product = ALL_PRODUCTS[resolvedParams.id];

  if (!product) {
    notFound();
  }

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    // 1. Update the Redux State
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        size: selectedSize,
        color: product.colors[selectedColor]?.name || "Default",
        image: product.images[selectedImage] || product.images[0],
        quantity: quantity,
      })
    );
    
    // 2. Navigate to the cart page
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-black/60 mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <HiChevronRight className="text-xs" />
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <HiChevronRight className="text-xs" />
          <span className="text-black font-medium">{product.title}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Images Section */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 justify-between sm:justify-start">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-[110px] h-[110px] sm:w-[152px] sm:h-[167px] bg-[#F0EEED] rounded-[20px] overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-black"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="relative flex-1 h-[400px] sm:h-[530px] bg-[#F0EEED] rounded-[20px] overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                priority
                className="object-contain p-4"
              />
            </div>
          </div>

          {/* Product Info & Controls */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              {product.title}
            </h1>

            {/* Price & Discount */}
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl sm:text-3xl font-bold text-black/40 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-[#FF3333]/10 text-[#FF3333] font-medium text-xs sm:text-sm px-3 py-1 rounded-full">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-black/60 text-sm sm:text-base leading-relaxed border-b border-black/10 pb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="border-b border-black/10 pb-6">
              <label className="block text-sm text-black/60 mb-3">Select Colors</label>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(idx)}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select color ${color.name}`}
                    className="w-9 h-9 rounded-full flex items-center justify-center relative transition-transform active:scale-95"
                  >
                    {selectedColor === idx && (
                      <HiCheck className="text-white text-lg" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="border-b border-black/10 pb-6">
              <label className="block text-sm text-black/60 mb-3">Choose Size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center justify-between w-[120px] sm:w-[170px] h-[52px] bg-[#F0F0F0] rounded-full px-5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="text-black hover:opacity-60 transition-opacity"
                >
                  <HiMinus className="text-base" />
                </button>
                <span className="font-medium text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="text-black hover:opacity-60 transition-opacity"
                >
                  <HiPlus className="text-base" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white rounded-full h-[52px] font-medium text-base hover:bg-black/80 transition-all active:scale-[0.99]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}