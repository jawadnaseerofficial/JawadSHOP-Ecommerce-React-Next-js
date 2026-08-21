"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiTrash,
  HiOutlineTag,
  HiChevronRight,
  HiMinus,
  HiPlus,
  HiArrowRight,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateQuantity, removeFromCart } from "@/store/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const [promoCode, setPromoCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0.2);
  const [isPromoApplied, setIsPromoApplied] = useState(true);

  const handleQuantityChange = (
    id: string,
    size: string,
    color: string,
    delta: number
  ) => {
    dispatch(updateQuantity({ id, size, color, delta }));
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    dispatch(removeFromCart({ id, size, color }));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SAVE20") {
      setDiscountPercentage(0.2);
      setIsPromoApplied(true);
    }
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = Math.round(
    subtotal * (isPromoApplied ? discountPercentage : 0)
  );
  const deliveryFee = items.length > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="min-h-screen bg-white font-sans text-black pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-black/60 mb-6">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <HiChevronRight className="text-xs" />
          <span className="text-black font-medium">Cart</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold uppercase tracking-tight mb-6 sm:mb-8">
          YOUR CART
        </h1>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 border border-black/10 rounded-[20px] bg-white">
            <p className="text-xl font-medium text-black/60 mb-4">
              Your cart is currently empty.
            </p>
            <Link
              href="/"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-black/80 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Main Layout: Cart List + Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 border border-black/10 rounded-[20px] p-4 sm:p-6 bg-white space-y-4 sm:space-y-6">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}`}>
                  <div className="flex gap-4 sm:gap-6 items-center">
                    {/* Item Image */}
                    <div className="relative w-[100px] h-[100px] sm:w-[124px] sm:h-[124px] bg-[#F0EEED] rounded-[8.66px] flex-shrink-0 overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 640px) 100px, 124px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between self-stretch">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-base sm:text-xl text-black leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-black/60 mt-0.5">
                            Size: <span className="text-black/80">{item.size}</span>
                          </p>
                          <p className="text-xs sm:text-sm text-black/60">
                            Color: <span className="text-black/80">{item.color}</span>
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            handleRemoveItem(item.id, item.size, item.color)
                          }
                          aria-label={`Remove ${item.name}`}
                          className="text-[#FF3333] hover:text-red-700 transition-colors p-1"
                        >
                          <HiTrash className="text-xl sm:text-2xl" />
                        </button>
                      </div>

                      {/* Price & Quantity Selector */}
                      <div className="flex items-end justify-between mt-2">
                        <span className="font-bold text-xl sm:text-2xl text-black">
                          ${item.price}
                        </span>

                        <div className="flex items-center justify-between w-[105px] sm:w-[126px] h-[36px] sm:h-[44px] bg-[#F0F0F0] rounded-full px-3 sm:px-4">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.size,
                                item.color,
                                -1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="text-black hover:opacity-60 transition-opacity"
                          >
                            <HiMinus className="text-sm sm:text-base" />
                          </button>

                          <span className="font-medium text-sm sm:text-base text-black">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.size,
                                item.color,
                                1
                              )
                            }
                            aria-label="Increase quantity"
                            className="text-black hover:opacity-60 transition-opacity"
                          >
                            <HiPlus className="text-sm sm:text-base" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < items.length - 1 && (
                    <div className="w-full h-[1px] bg-black/10 mt-4 sm:mt-6" />
                  )}
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 border border-black/10 rounded-[20px] p-5 sm:p-6 bg-white space-y-6">
              <h2 className="font-bold text-xl sm:text-2xl text-black">
                Order Summary
              </h2>

              <div className="space-y-4 text-base sm:text-lg">
                <div className="flex items-center justify-between text-black/60">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">${subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-black/60">
                  <span>Discount (-{discountPercentage * 100}%)</span>
                  <span className="font-bold text-[#FF3333]">
                    -${discountAmount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-black/60">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black">${deliveryFee}</span>
                </div>

                <div className="w-full h-[1px] bg-black/10 my-2" />

                <div className="flex items-center justify-between text-black text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <form onSubmit={handleApplyPromo} className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 bg-[#F0F0F0] rounded-full px-4 py-3 text-black">
                  <HiOutlineTag className="text-black/40 text-xl flex-shrink-0" />
                 <input
  type="text"
  placeholder="Add promo code"
  value={promoCode}
  onChange={(e) => setPromoCode(e.target.value)}
  className="w-full bg-transparent outline-none text-sm placeholder:text-black/40"
/>
</div>
                <button
                  type="submit"
                  className="bg-black hover:bg-black/80 text-white font-medium text-sm px-6 py-3 rounded-full transition-colors flex-shrink-0"
                >
                  Apply
                </button>
              </form>

              <button
                type="button"
                className="w-full bg-black hover:bg-black/80 text-white font-medium text-sm sm:text-base py-4 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <span>Go to Checkout</span>
                <HiArrowRight className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}