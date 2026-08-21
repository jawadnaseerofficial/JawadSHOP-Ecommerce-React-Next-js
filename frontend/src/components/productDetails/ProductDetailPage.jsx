import React, { useState } from 'react';
import { Star, Check, Minus, Plus, ChevronRight, Filter, ChevronDown, Mail } from 'lucide-react';

const mockProduct = {
  title: "One Life Graphic T-shirt",
  rating: 4.5,
  price: 260,
  originalPrice: 300,
  discount: "-40%",
  description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  colors: [
    { name: "Olive", hex: "#4F4631" },
    { name: "Teal", hex: "#314F4A" },
    { name: "Navy", hex: "#31344F" },
  ],
  sizes: ["Small", "Medium", "Large", "X-Large"],
  images: [
    "https://via.placeholder.com/444x530?text=Main+Image",
    "https://via.placeholder.com/152x167?text=Thumb+1",
    "https://via.placeholder.com/152x168?text=Thumb+2",
    "https://via.placeholder.com/152x167?text=Thumb+3",
  ]
};

const mockReviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 4.5,
    verified: true,
    comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "August 14, 2023"
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4.0,
    verified: true,
    comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "August 15, 2023"
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 3.5,
    verified: true,
    comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "August 16, 2023"
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 4.0,
    verified: true,
    comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    date: "August 17, 2023"
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 4.0,
    verified: true,
    comment: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: "August 18, 2023"
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 4.5,
    verified: true,
    comment: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "August 19, 2023"
  }
];

const mockRelatedProducts = [
  { id: 1, title: "Polo with Contrast Trims", rating: 4.0, price: 212, originalPrice: 242, discount: "-20%", image: "https://via.placeholder.com/295x298" },
  { id: 2, title: "Gradient Graphic T-shirt", rating: 3.5, price: 145, image: "https://via.placeholder.com/295x298" },
  { id: 3, title: "Polo with Tipping Details", rating: 4.5, price: 180, image: "https://via.placeholder.com/295x298" },
  { id: 4, title: "Black Striped T-shirt", rating: 5.0, price: 120, originalPrice: 150, discount: "-30%", image: "https://via.placeholder.com/295x298" },
];

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("reviews");

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1 text-[#FFC633]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={star <= Math.floor(rating) ? "fill-current" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6 font-sans text-black">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-3 text-sm text-black/60 mb-8">
        <a href="#" className="hover:text-black">Home</a>
        <ChevronRight size={16} />
        <a href="#" className="hover:text-black">Shop</a>
        <ChevronRight size={16} />
        <a href="#" className="hover:text-black">Men</a>
        <ChevronRight size={16} />
        <span className="text-black font-medium">{mockProduct.title}</span>
      </nav>

      {/* Main Section: Product Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto">
            {mockProduct.images.slice(1).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx + 1)}
                className={`w-[152px] h-[167px] rounded-[20px] overflow-hidden border ${
                  selectedImage === idx + 1 ? 'border-black' : 'border-transparent'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 h-[530px] bg-[#F0EEED] rounded-[20px] overflow-hidden">
            <img
              src={mockProduct.images[selectedImage]}
              alt="Main Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-start">
          <h1 className="font-bold text-4xl uppercase tracking-tight mb-3">
            {mockProduct.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            {renderStars(mockProduct.rating)}
            <span className="text-sm font-normal">{mockProduct.rating}/5</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">${mockProduct.price}</span>
            <span className="text-3xl font-bold text-black/30 line-through">
              ${mockProduct.originalPrice}
            </span>
            <span className="bg-[#FF3333]/10 text-[#FF3333] text-sm font-medium px-3 py-1 rounded-full">
              {mockProduct.discount}
            </span>
          </div>

          <p className="text-black/60 text-base mb-6 border-b border-black/10 pb-6">
            {mockProduct.description}
          </p>

          {/* Color Selection */}
          <div className="mb-6 border-b border-black/10 pb-6">
            <span className="text-sm text-black/60 block mb-3">Select Colors</span>
            <div className="flex gap-4">
              {mockProduct.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(idx)}
                  className="w-[37px] h-[37px] rounded-full flex items-center justify-center relative border border-black/10"
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor === idx && <Check size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6 border-b border-black/10 pb-6">
            <span className="text-sm text-black/60 block mb-3">Choose Size</span>
            <div className="flex flex-wrap gap-3">
              {mockProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-full text-sm transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'bg-[#F0F0F0] text-black/60 hover:bg-black/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-5 py-3 w-[170px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-black hover:opacity-70"
              >
                <Minus size={18} />
              </button>
              <span className="font-medium text-base">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-black hover:opacity-70"
              >
                <Plus size={18} />
              </button>
            </div>

            <button className="flex-1 bg-black text-white rounded-full py-3 font-medium text-base hover:bg-black/80 transition-all">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-black/10 flex justify-between mb-8 text-center text-lg">
        <button
          onClick={() => setActiveTab('details')}
          className={`w-1/3 pb-4 transition-all ${
            activeTab === 'details'
              ? 'border-b-2 border-black font-medium text-black'
              : 'text-black/60'
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`w-1/3 pb-4 transition-all ${
            activeTab === 'reviews'
              ? 'border-b-2 border-black font-medium text-black'
              : 'text-black/60'
          }`}
        >
          Rating & Reviews
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`w-1/3 pb-4 transition-all ${
            activeTab === 'faqs'
              ? 'border-b-2 border-black font-medium text-black'
              : 'text-black/60'
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Tab Contents: Ratings & Reviews */}
      {activeTab === 'reviews' && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold">All Reviews</h2>
              <span className="text-black/60 text-sm">(451)</span>
            </div>

            <div className="flex gap-3">
              <button className="w-12 h-12 bg-[#F0F0F0] rounded-full flex items-center justify-center">
                <Filter size={20} />
              </button>
              <button className="bg-[#F0F0F0] px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium">
                Latest <ChevronDown size={16} />
              </button>
              <button className="bg-black text-white px-5 py-3 rounded-full text-sm font-medium">
                Write a Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-9">
            {mockReviews.map((rev) => (
              <div
                key={rev.id}
                className="border border-black/10 rounded-[20px] p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">{renderStars(rev.rating)}</div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="font-bold text-xl">{rev.name}</span>
                    {rev.verified && (
                      <span className="w-5 h-5 bg-[#01AB31] rounded-full flex items-center justify-center text-white text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-black/60 text-sm leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>
                <span className="text-black/60 text-sm font-medium">
                  Posted on {rev.date}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-16">
            <button className="border border-black/10 rounded-full px-12 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all">
              Load More Reviews
            </button>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      <section className="mb-20">
        <h2 className="text-4xl font-bold uppercase text-center mb-10">
          You might also like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {mockRelatedProducts.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="bg-[#F0EEED] rounded-[20px] h-[298px] mb-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <div className="mb-2">{renderStars(item.rating)}</div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">${item.price}</span>
                {item.originalPrice && (
                  <span className="font-bold text-xl text-black/40 line-through">
                    ${item.originalPrice}
                  </span>
                )}
                {item.discount && (
                  <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs font-medium px-2 py-1 rounded-full">
                    {item.discount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold uppercase max-w-[550px] leading-tight">
          Stay upto date about our latest offers
        </h2>
        <div className="flex flex-col gap-3 w-full md:w-[350px]">
          <div className="bg-white text-black rounded-full px-4 py-3 flex items-center gap-3">
            <Mail size={20} className="text-black/40" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent outline-none text-sm w-full placeholder:text-black/40"
            />
          </div>
          <button className="bg-white text-black font-medium rounded-full py-3 text-sm hover:bg-gray-100 transition-all">
            Subscribe to Newsletter
          </button>
        </div>
      </section>
    </div>
  );
}