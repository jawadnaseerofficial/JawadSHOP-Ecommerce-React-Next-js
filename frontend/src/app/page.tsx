'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import TopSelling from "@/components/TopSelling";
import DressStyle from "@/components/DressStyle";
import HomeRatingCustomers from "@/components/HomeRatingCustomers";
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if accessToken exists in localStorage
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      // If no token, redirect to login page immediately
      router.replace('/login');
    } else {
      // If token exists, stop checking and show content
      setIsChecking(false);
    }
  }, [router]); // Added router to dependencies to satisfy React hooks rules

  // While checking auth status, show a loader
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F0F1]">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    );
  }

  // Only render the main content if the user is authenticated
  return (
    <div>
      <Hero />
      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <HomeRatingCustomers />
    </div>
  );
}