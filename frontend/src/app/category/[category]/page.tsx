'use client';

import { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import { Star, ChevronDown } from 'lucide-react';

// Interface for mock product data
interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
}

// Valid categories mapping slug to display title
const CATEGORY_MAP: Record<string, string> = {
  casual: 'Casual',
  formal: 'Formal',
  party: 'Party',
  gym: 'Gym',
};

// Products per page threshold — pagination only appears above this
const PRODUCTS_PER_PAGE = 42;

// Mock product dataset categorized by style slug
// Images live in: frontend/public/images/clothes/
// Available files: Frame1.png - Frame4.png, image-1.png - image-4.png
const PRODUCTS: Product[] = [
  { id: 1, name: 'Gradient Graphic T-shirt', category: 'casual', rating: 3.5, price: 145, image: '/images/clothes/Frame1.png' },
  { id: 2, name: 'Polo with Tipping Details', category: 'casual', rating: 4.5, price: 180, image: '/images/clothes/Frame2.png' },
  { id: 3, name: 'Black Striped T-shirt', category: 'casual', rating: 5.0, price: 120, oldPrice: 150, discount: '-30%', image: '/images/clothes/Frame3.png' },
  { id: 4, name: 'SKINNY FIT JEANS', category: 'casual', rating: 3.5, price: 240, oldPrice: 260, discount: '-20%', image: '/images/clothes/Frame4.png' },
  { id: 5, name: 'CHECKERED SHIRT', category: 'casual', rating: 4.5, price: 180, image: '/images/clothes/image-1.png' },
  { id: 6, name: 'SLEEVE STRIPED T-SHIRT', category: 'casual', rating: 4.5, price: 130, oldPrice: 160, discount: '-30%', image: '/images/clothes/image-2.png' },
  { id: 7, name: 'Classic Tuxedo Suit', category: 'formal', rating: 4.8, price: 350, image: '/images/clothes/image-3.png' },
  { id: 8, name: 'Performance Gym Tank', category: 'gym', rating: 4.2, price: 65, image: '/images/clothes/image-4.png' },
  { id: 9, name: 'Sequined Party Dress', category: 'party', rating: 4.9, price: 220, image: '/images/clothes/Frame1.png' },
];

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = (params?.category as string)?.toLowerCase();

  // Validate category param
  if (!categorySlug || !CATEGORY_MAP[categorySlug]) {
    notFound();
  }

  const categoryTitle = CATEGORY_MAP[categorySlug];
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter products matching current route parameter
  const categoryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === categorySlug),
    [categorySlug]
  );

  // Fallback to all products if category has none (keeps demo working)
  const allProducts = categoryProducts.length > 0 ? categoryProducts : PRODUCTS;
  const totalProducts = allProducts.length;

  // Dynamic total pages based on real product count
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  // Clamp currentPage safely within valid range
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // Slice products for the current page
  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const displayedProducts = allProducts.slice(startIndex, endIndex);

  // Decide whether pagination should be visible at all
  const showPagination = totalPages > 1;

  // Handler that also scrolls to top of grid on page change (nice UX)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-[100px] py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-sm text-black/60 mb-6">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronDown className="-rotate-90 w-4 h-4" />
        <span className="text-black font-medium">{categoryTitle}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Component */}
        <FilterSidebar onApplyFilters={(filters: Record<string, unknown>) => console.log('Filters Applied:', filters)} />

        {/* Product Listing Area */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-[32px] font-bold text-black">{categoryTitle}</h1>
            <div className="flex items-center gap-3 text-sm text-black/60">
              <span>
                Showing {totalProducts === 0 ? 0 : startIndex + 1}-
                {Math.min(endIndex, totalProducts)} of {totalProducts} Products
              </span>
              <div className="flex items-center gap-1 text-black font-medium cursor-pointer">
                <span>Sort by: Most Popular</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {displayedProducts.map((prod) => (
              <div key={prod.id} className="space-y-3 group cursor-pointer">
                <div className="relative bg-[#F0EEED] rounded-[20px] aspect-square overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg text-black">{prod.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-[#FFC633]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-black/60">{prod.rating}/5</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-2xl text-black">${prod.price}</span>
                  {prod.oldPrice && (
                    <span className="font-bold text-2xl text-black/40 line-through">
                      ${prod.oldPrice}
                    </span>
                  )}
                  {prod.discount && (
                    <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs font-medium px-[14px] py-[6px] rounded-[62px]">
                      {prod.discount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination — ONLY renders when products exceed 42 */}
          {showPagination && (
            <div className="flex justify-center pt-8">
              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}