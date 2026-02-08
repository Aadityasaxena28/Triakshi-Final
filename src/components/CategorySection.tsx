import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X, TrendingUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { search } from "@/API/Product";
import { Product } from "@/DataTypes/product";
import pachmukhi from '@/assets/5 mukhi.png';
import manik from "@/assets/Stones/Ruby.png";
import yantra from '@/assets/yantra.png';
import tribh from '@/assets/tribhuvani incense.png';
import braceletImg from "@/assets/bracelet-category.jpg";
import icon from "@/assets/malaface.png";
import pyriteImg from "@/assets/pyrite_1.jpg";

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
}

const CategorySection = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

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
      id: "pyrite",
      name: "Pyrite",
      image: pyriteImg,
      path: "/gem-view/69847c7c9b2687cd8f7dddcf",
    },
    {
      id: "mala",
      name: "Mala",
      image: icon,
      path: "/Mala",
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

  const trendingSearches = ["Rudraksha", "Ruby", "Yantra", "Mala"];

  // Debounced search with error handling
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // Only search if query has at least 2 characters
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        setSearchError(null);
        
        try {
          const results = await search(searchQuery);
          setSearchResults(results);
          setShowResults(true);
        } catch (error: any) {
          console.error("Search error:", error);
          setSearchError(error.message || "Search failed");
          setSearchResults([]);
          setShowResults(true);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
        setSearchError(null);
      }
    }, 400); // Increased debounce time to 400ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  const handleProductClick = (productId: string) => {
    setShowResults(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  const handleTrendingClick = (query: string) => {
    setSearchQuery(query);
    searchInputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setSearchError(null);
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
    <section className="w-full py-6 md:py-8 px-4 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar Section */}
        <div className="mb-8 md:mb-10">
          <div className="relative max-w-3xl mx-auto">
            {/* Search Input */}
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? "transform scale-[1.02]" : ""
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isSearchFocused ? "text-amber-600" : "text-gray-400"
                  }`}
                />
              </div>
              
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search for spiritual products..."
                className="w-full pl-12 pr-12 py-4 text-base md:text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 shadow-sm hover:shadow-md placeholder:text-gray-400"
              />

              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {isSearching && (
                <div className="absolute inset-y-0 right-12 flex items-center pr-4">
                  <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchQuery.length >= 2 && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
                {searchError ? (
                  <div className="px-4 py-8 text-center">
                    <div className="text-red-400 mb-2">
                      <X className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-red-600 text-sm font-medium mb-1">
                      Search Error
                    </p>
                    <p className="text-gray-500 text-xs">
                      {searchError}
                    </p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Results ({searchResults.length})
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="px-4 py-3 hover:bg-amber-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 truncate">
                              {product.name}
                            </h4>
                            {product.category && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {product.category}
                              </p>
                            )}
                          </div>
                          {product.price && (
                            <div className="text-sm font-bold text-amber-600 flex-shrink-0">
                              ₹{product.price}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <Search className="w-12 h-12 mx-auto opacity-50" />
                    </div>
                    <p className="text-gray-500 text-sm">
                      No products found for "{searchQuery}"
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Helper text for minimum characters */}
            {searchQuery.length > 0 && searchQuery.length < 2 && isSearchFocused && (
              <div className="mt-2 text-xs text-gray-400 text-center">
                Type at least 2 characters to search
              </div>
            )}

            {/* Trending Searches */}
            {!searchQuery && !showResults && (
              <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Trending:
                </span>
                {trendingSearches.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrendingClick(trend)}
                    className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-full transition-colors duration-200 border border-amber-200"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <div className="relative group">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 border border-gray-200 hover:border-amber-300"
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
                {/* Square Icon Container */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-amber-100 to-orange-50">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.style.background =
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
                    }}
                  />
                </div>

                {/* Category Name */}
                <h3 className="mt-2 text-xs md:text-sm font-semibold text-center text-gray-800 w-20 md:w-24 group-hover/item:text-amber-700 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 border border-gray-200 hover:border-amber-300"
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