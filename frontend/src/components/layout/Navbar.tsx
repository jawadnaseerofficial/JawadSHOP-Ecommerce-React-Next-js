"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function Navbar() {
  // Pull cart items from Redux store to calculate the total count
  const items = useAppSelector((state) => state.cart.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="mx-auto flex h-[48px] max-w-[1240px] items-center gap-[80px] bg-white px-4 m-4">
      {/* Logo */}
      <Link href="/" className="font-['Integral_CF'] text-[32px] font-bold tracking-tight text-black">
        JAWADSHOP
      </Link>

      {/* Nav Links */}
      <ul className="flex items-center gap-[24px]">
        <li>
          <Link href="#" className="flex items-center gap-[4px] text-[16px] text-black">
            Shop <ChevronDown className="h-4 w-4" />
          </Link>
        </li>
        <li>
          <Link href="#" className="text-[16px] text-black">
            On Sale
          </Link>
        </li>
        <li>
          <Link href="#" className="text-[16px] text-black">
            New Arrivals
          </Link>
        </li>
        <li>
          <Link href="#" className="text-[16px] text-black">
            Brands
          </Link>
        </li>
      </ul>

      {/* Search Input */}
      <div className="flex h-[48px] w-[500px] flex-1 items-center gap-[20px] rounded-[62px] bg-[#F0F0F0] px-[16px] py-[12px]">
        <Search className="h-5 w-5 text-black/40" />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full bg-transparent text-[16px] text-black placeholder:text-black/40 focus:outline-none text-left"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-[14px]">
        <Link href="/cart" aria-label="Shopping Cart" className="relative">
          <ShoppingCart className="h-6 w-6 text-black " />
          {/* Notification Badge */}
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
        <Link href="/UserProfile" aria-label="User Profile">
          <User className="h-6 w-6 text-black" />
        </Link>
      </div>
    </nav>
  );
}