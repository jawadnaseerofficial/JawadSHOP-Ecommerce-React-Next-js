import Link from "next/link";
import { 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaGithub, 
  FaEnvelope, 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal, 
  FaCcApplePay, 
  FaGooglePay 
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-[#F0F0F0] mt-24 pt-0 pb-10 font-sans">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Newsletter Banner Overlay */}
        <div className="bg-black text-white rounded-[20px] px-6 py-9 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 -translate-y-1/2 shadow-lg">
          <h2 className="font-extrabold text-3xl sm:text-4xl leading-tight max-w-[551px] uppercase tracking-tight">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          
          <div className="flex flex-col gap-3.5 w-full md:w-[349px]">
            {/* Input Field */}
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 text-black">
              <FaEnvelope className="text-black/40 text-lg flex-shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none text-sm placeholder:text-black/40"
              />
            </div>
            
            {/* Subscribe Button */}
            <button
              type="button"
              className="w-full bg-white hover:bg-gray-100 text-black font-medium text-sm py-3 rounded-full transition-colors"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 pt-2 pb-12">
          
          {/* Brand & Socials Column */}
          <div className="md:col-span-1 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <Link href="/" className="text-3xl font-extrabold text-black uppercase tracking-tight">
                JAWADSHOP
              </Link>
              <p className="text-sm text-black/60 leading-relaxed max-w-[248px]">
                We have clothes that suits your style and which you’re proud to wear. From women to men.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-[28px] h-[28px] rounded-full bg-white border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                <FaTwitter className="text-[11px]" />
              </a>
              <a href="#" className="w-[28px] h-[28px] rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <FaFacebookF className="text-[12px]" />
              </a>
              <a href="#" className="w-[28px] h-[28px] rounded-full bg-white border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                <FaInstagram className="text-[13px]" />
              </a>
              <a href="#" className="w-[28px] h-[28px] rounded-full bg-white border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                <FaGithub className="text-[13px]" />
              </a>
            </div>
          </div>

          {/* Navigation Link Columns */}
          <div>
            <h3 className="font-medium text-base uppercase tracking-[3px] text-black mb-6">
              COMPANY
            </h3>
            <ul className="space-y-3.5 text-sm text-black/60">
              <li><Link href="#" className="hover:text-black transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Works</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Career</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base uppercase tracking-[3px] text-black mb-6">
              HELP
            </h3>
            <ul className="space-y-3.5 text-sm text-black/60">
              <li><Link href="#" className="hover:text-black transition-colors">Customer Support</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Delivery Details</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base uppercase tracking-[3px] text-black mb-6">
              FAQ
            </h3>
            <ul className="space-y-3.5 text-sm text-black/60">
              <li><Link href="#" className="hover:text-black transition-colors">Account</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Manage Deliveries</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Orders</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Payments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base uppercase tracking-[3px] text-black mb-6">
              RESOURCES
            </h3>
            <ul className="space-y-3.5 text-sm text-black/60">
              <li><Link href="#" className="hover:text-black transition-colors">Free eBooks</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Development Tutorial</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">How to - Blog</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Youtube Playlist</Link></li>
            </ul>
          </div>

        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-black/10 my-4" />

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-sm text-black/60 text-center sm:text-left">
            JAWADSHOP © 2000-2026, All Rights Reserved
          </p>

          {/* Payment Badges with Real Brand Colors */}
          <div className="flex items-center gap-3">
            {/* Visa */}
            <div className="w-[46px] h-[30px] bg-white border border-[#D6DCE5] rounded-[5px] flex items-center justify-center shadow-sm">
              <FaCcVisa className="text-2xl text-[#1434CB]" />
            </div>

            {/* Mastercard */}
            <div className="w-[46px] h-[30px] bg-white border border-[#D6DCE5] rounded-[5px] flex items-center justify-center shadow-sm">
              <FaCcMastercard className="text-2xl text-[#EB001B]" />
            </div>

            {/* PayPal */}
            <div className="w-[46px] h-[30px] bg-white border border-[#D6DCE5] rounded-[5px] flex items-center justify-center shadow-sm">
              <FaCcPaypal className="text-2xl text-[#003087]" />
            </div>

            {/* Apple Pay */}
            <div className="w-[46px] h-[30px] bg-white border border-[#D6DCE5] rounded-[5px] flex items-center justify-center shadow-sm">
              <FaCcApplePay className="text-2xl text-black" />
            </div>

            {/* Google Pay */}
            <div className="w-[46px] h-[30px] bg-white border border-[#D6DCE5] rounded-[5px] flex items-center justify-center shadow-sm">
              <FaGooglePay className="text-3xl text-[#4285F4]" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}