'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../../lib/auth'; 
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await loginUser(email, password);
      // ✅ CHANGED: Redirect to Home Page ('/') instead of UserProfile
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE: Visual/Image */}
      <div className="hidden lg:flex w-1/2 relative bg-[#F2F0F1] items-center justify-center overflow-hidden">
        <Image 
          src="/images/Hero/trendy-fashionable-couple-posing.png" 
          alt="Fashion Model" 
          fill 
          priority 
          className="object-cover opacity-90"
          quality={100}
        />
        <div className="absolute bottom-10 left-10 z-10 max-w-md">
          <h2 className="text-4xl font-bold text-black mb-2">Welcome Back</h2>
          <p className="text-black/70 text-lg">
            Discover the latest trends and manage your orders seamlessly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block mb-8">
              <span className="font-['Integral_CF'] text-3xl font-bold tracking-tight text-black">
                JAWADSHOP
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-black mb-2">Log In</h1>
            <p className="text-black/60">
              Enter your details to access your account.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-[#F50606]/10 border border-[#F50606]/20 text-[#F50606] text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-black/70 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jawad@shop.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#F0F0F0] text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-black/70 block">
                  Password
                </label>
                <Link href="#" className="text-sm font-medium text-black hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#F0F0F0] text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-black text-white font-medium text-lg hover:bg-black/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Footer / Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-black/60">
              Don't have an account?{' '}
              <Link href="/register" className="font-bold text-black hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}