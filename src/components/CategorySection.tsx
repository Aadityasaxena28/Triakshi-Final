import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import pachmukhi from '@/assets/5 mukhi.png';
import manik from "@/assets/Stones/Ruby.png";
import health from '@/assets/health.png';
import yantra from "@/assets/yantra.png";
import tribh from "@/assets/tribhuvani incense.png";
import braceletImg from "@/assets/bracelet-category.jpg";
interface Category {
  id: string;
  name: string;
  image: string; // URL to the category image
  path: string;
}

const CategorySection = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id: "rudraksha",
      name: "Rudraksha",
      image: pachmukhi,
      path: "/rudraksha",
    },
    {
      id: "gemstones",
      name: "Gemstones",
      image: manik,
      path: "/gemstones",
    },
    {
      id: "mala",
      name: "Mala",
      image: health,
      path: "/mala",
    },
    {
      id: "bracelets",
      name: "Bracelets",
      image: braceletImg,
      path: "/bracelet",
    },
    {
      id: "yantra",
      name: "Yantra",
      image: yantra,
      path: "/yantra",
    },
    {
      id: "tribhuvani",
      name: "Tribhuvani",
      image: tribh,
      path: "/tribhuvani",
    },
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-6 md:py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Shop by Category
          </h2>
        </div>

        {/* Scrollable Container with Navigation Buttons */}
        <div className="relative group">
          {/* Left Scroll Button - Hidden on mobile, visible on desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Categories Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.path)}
                className="flex-shrink-0 cursor-pointer group/item"
              >
                {/* Square Icon Container - Reduced to 25% (80px on mobile, 100px on desktop) */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a gradient background if image fails to load
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.style.background =
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                    }}
                  />
                </div>

                {/* Category Name */}
                <h3 className="mt-2 text-xs md:text-sm font-semibold text-center text-gray-800 w-20 md:w-24">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Right Scroll Button - Hidden on mobile, visible on desktop */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;