'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronRight, ChevronDown, Check } from 'lucide-react';

const CATEGORIES = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
const STYLES = ['Casual', 'Formal', 'Party', 'Gym'];
const SIZES = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
// Colors exactly as per Figma CSS
const COLORS = [
  '#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5', 
  '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'
];

export default function FilterSidebar({ onApplyFilters }: { onApplyFilters: (filters: any) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('Large');
  const [selectedColor, setSelectedColor] = useState<string>('#063AF5');
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  // Helper for price slider logic
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), priceRange[1] - 10);
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), priceRange[0] + 10);
    setPriceRange([priceRange[0], val]);
  };

  return (
    <aside className="w-[295px] flex-shrink-0 border border-black/10 rounded-[20px] p-[20px_24px] flex flex-col gap-6 bg-white h-fit">
      
      {/* Header: Filters */}
      <div className="flex justify-between items-center w-full pb-6 border-b border-black/10">
        <h3 className="font-bold text-[20px] leading-[27px] text-black">Filters</h3>
        <SlidersHorizontal className="w-6 h-6 text-black/40 cursor-pointer" />
      </div>

      {/* Categories List */}
      <div className="flex flex-col gap-5 w-full pb-6 border-b border-black/10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex justify-between items-center w-full text-left text-[16px] leading-[22px] transition-colors ${
              selectedCategory === cat ? 'font-medium text-black' : 'text-black/60 hover:text-black'
            }`}
          >
            <span>{cat}</span>
            <ChevronRight className="w-4 h-4 text-black/60" />
          </button>
        ))}
      </div>

      {/* Price Range Slider */}
      <div className="flex flex-col gap-5 w-full pb-6 border-b border-black/10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-[20px] leading-[27px] text-black">Price</h4>
          <ChevronDown className="w-4 h-4 text-black rotate-180" />
        </div>
        
        {/* Custom Dual Slider Implementation */}
        <div className="relative w-full h-[43px] mt-2">
          {/* Labels */}
          <div className="absolute top-0 left-0 w-full flex justify-between text-[14px] font-medium text-black pointer-events-none">
             {/* Positioning labels roughly based on values for demo, 
                 in production use dynamic left% calculation */}
             <span style={{ position: 'absolute', left: `${(priceRange[0]/500)*100}%`, transform: 'translateX(-50%)' }}>${priceRange[0]}</span>
             <span style={{ position: 'absolute', left: `${(priceRange[1]/500)*100}%`, transform: 'translateX(-50%)' }}>${priceRange[1]}</span>
          </div>

          {/* Track Background */}
          <div className="absolute top-[24px] left-0 w-full h-[6px] bg-[#F0F0F0] rounded-[20px]" />
          
          {/* Active Track */}
          <div 
            className="absolute top-[24px] h-[6px] bg-black rounded-[20px]"
            style={{ 
              left: `${(priceRange[0] / 500) * 100}%`, 
              right: `${100 - (priceRange[1] / 500) * 100}%` 
            }} 
          />

          {/* Inputs (Invisible but interactive) */}
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="absolute top-[17px] left-0 w-full h-[20px] appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="absolute top-[17px] left-0 w-full h-[20px] appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      {/* Colors Grid */}
      <div className="flex flex-col gap-5 w-full pb-6 border-b border-black/10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-[20px] leading-[27px] text-black">Colors</h4>
          <ChevronDown className="w-4 h-4 text-black rotate-180" />
        </div>
        {/* Grid with 5 columns to match Figma's 2 rows of 5 */}
        <div className="grid grid-cols-5 gap-4 w-full">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-[37px] h-[37px] rounded-full border border-black/20 relative flex items-center justify-center transition-transform hover:scale-105 ${
                selectedColor === color ? 'ring-2 ring-black ring-offset-2' : ''
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            >
              {selectedColor === color && (
                <Check className={`w-4 h-4 ${color === '#FFFFFF' ? 'text-black' : 'text-white'}`} strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-5 w-full pb-6 border-b border-black/10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-[20px] leading-[27px] text-black">Size</h4>
          <ChevronDown className="w-4 h-4 text-black rotate-180" />
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-[10px] rounded-[62px] text-[14px] leading-[19px] transition-colors ${
                selectedSize === size
                  ? 'bg-black text-white font-medium'
                  : 'bg-[#F0F0F0] text-black/60 hover:bg-black/10'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      <div className="flex flex-col gap-5 w-full pb-6 border-b border-black/10">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-[20px] leading-[27px] text-black">Dress Style</h4>
          <ChevronDown className="w-4 h-4 text-black rotate-180" />
        </div>
        <div className="flex flex-col gap-5 w-full">
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`flex justify-between items-center w-full text-left text-[16px] leading-[22px] transition-colors ${
                selectedStyle === style ? 'font-medium text-black' : 'text-black/60 hover:text-black'
              }`}
            >
              <span>{style}</span>
              <ChevronRight className="w-4 h-4 text-black/60" />
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => onApplyFilters({ selectedCategory, selectedStyle, selectedSize, selectedColor, priceRange })}
        className="w-full h-[48px] bg-black text-white text-[14px] font-medium rounded-[62px] hover:bg-black/90 transition-colors mt-auto"
      >
        Apply Filter
      </button>
    </aside>
  );
}