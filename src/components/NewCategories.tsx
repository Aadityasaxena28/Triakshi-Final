import { getProducts } from "@/API/Product";
import { Button } from "@/components/ui/button";
import { Product } from "@/DataTypes/product";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Coins,
  Eye,
  GraduationCap,
  Heart,
  Shield,
  Sparkles
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCategories = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: "all",
      name: "All",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "career",
      name: "Career",
      icon: Briefcase,
      color: "from-orange-500 to-amber-600",
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: "love-life",
      name: "Love Life",
      icon: Heart,
      color: "from-red-500 to-orange-500",
    },
    {
      id: "health",
      name: "Health",
      icon: Shield,
      color: "from-orange-600 to-amber-500",
    },
    {
      id: "finance",
      name: "Finance",
      icon: Coins,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  // Fetch Mala products
  const { data: malaProducts = [], isLoading: malaLoading, isError: malaError } = useQuery({
    queryKey: ["category-mala-products", activeCategory],
    queryFn: () =>
      getProducts({
        page: 1,
        category: "mala",
        type: activeCategory === "all" ? "" : activeCategory,
        productCount: 5,
      }),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch Bracelet products
  const { data: braceletProducts = [], isLoading: braceletLoading, isError: braceletError } = useQuery({
    queryKey: ["category-bracelet-products", activeCategory],
    queryFn: () =>
      getProducts({
        page: 1,
        category: "bracelet",
        type: activeCategory === "all" ? "" : activeCategory,
        productCount: 5,
      }),
    staleTime: 1000 * 60 * 5,
  });

  // Merge and filter products
  const allProducts = useMemo(() => {
    const merged = [...malaProducts, ...braceletProducts];
    return merged.filter(
      (product: Product) =>
        product &&
        product.price != null &&
        product.price > 0 &&
        product.name
    );
  }, [malaProducts, braceletProducts]);

  const updateScrollProgress = () => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const progress = scrollWidth > 0 ? Math.min(100, Math.max(0, (scrollLeft / scrollWidth) * 100)) : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // Initial calculation
      updateScrollProgress();
      
      // Add scroll listener
      scrollElement.addEventListener('scroll', updateScrollProgress);
      
      // Add resize listener
      window.addEventListener('resize', updateScrollProgress);
      
      // Recalculate after products load
      const timer = setTimeout(updateScrollProgress, 500);
      
      return () => {
        scrollElement.removeEventListener('scroll', updateScrollProgress);
        window.removeEventListener('resize', updateScrollProgress);
        clearTimeout(timer);
      };
    }
  }, [allProducts, activeCategory]);

  const handleSlideChange = (direction: string) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "next" ? 300 : -300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleViewDetails = (product: Product) => {
    if (product.category === 'gemstone') {
      navigate(`/gemstone/${product.id}`);
    } else if (product.category === 'mala' || product.category === 'bracelet') {
      navigate(`/mala-brace-view/${product.id}`);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const getProductImage = (product: Product) => {
    // const baseUrl = import.meta.env.VITE_api_url || "http://localhost:5000";
    
    if (product.images && product.images[0]) {
      return `${product.images[0]}`;
    } else if (product.image) {
      return `${product.image}`;
    }
    return "";
  };

  const calculateDiscountedPrice = (product: Product) => {
    const price = product.price || 0;
    const discount = product.discount || 0;
    const discountAmount = (price * discount) / 100;
    return Math.round(price - discountAmount);
  };

  const isLoading = malaLoading || braceletLoading;
  const isError = malaError && braceletError;

  return (
    <section className="py-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-40 w-40 h-40 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            <h2 className="text-4xl sm:text-4xl font-bold">
              <span 
                className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                }}
              >
                Shop by Life Area
              </span>
            </h2>
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-xs text-gray-700 max-w-2xl mx-auto font-medium">
            ✨ Find the perfect mala or bracelet for your specific needs and aspirations ✨
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setScrollProgress(0);
                }}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                    : "bg-white border-2 border-orange-200 text-gray-700 hover:border-orange-400 hover:shadow-lg"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span className="font-semibold text-[10px]">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-2 text-gray-600 text-xs">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-8 text-red-600 text-xs">
            <p>Failed to load products. Please try again later.</p>
          </div>
        )}

        {/* Products Display */}
        {!isLoading && !isError && (
          <>
            {allProducts.length > 0 ? (
              <>
                <div 
                  ref={scrollRef}
                  className="flex overflow-x-auto no-scrollbar gap-2 pb-2"
                  style={{
                    scrollSnapType: "x mandatory",
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {allProducts.map((product: Product) => {
                    const price = product.price || 0;
                    const discount = product.discount || 0;
                    const discountedPrice = calculateDiscountedPrice(product);
                    const rating = product.rating || 0;

                    return (
                      <div
                        key={product.id}
                        className="flex-shrink-0 w-[160px]"
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <div className="bg-white border-2 border-orange-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 overflow-hidden relative group">
                          {/* Discount Badge */}
                          {discount > 0 && (
                            <div className="absolute top-1.5 left-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg z-10">
                              {discount}% OFF
                            </div>
                          )}

                          {/* Category Badge */}
                          <div className="absolute top-1.5 right-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg z-10 capitalize">
                            {product.category}
                          </div>

                          {/* Festive corner decoration */}
                          <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-bl-full"></div>

                          {/* Image */}
                          <div 
                            className="aspect-square overflow-hidden rounded-t-xl relative bg-gray-100 cursor-pointer"
                            onClick={() => handleViewDetails(product)}
                          >
                            {getProductImage(product) ? (
                              <img
                                src={getProductImage(product)}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onLoad={updateScrollProgress}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Sparkles className="w-10 h-10" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                            {/* Quick View Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-orange-600 hover:bg-orange-50 text-[10px] h-6 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(product);
                                }}
                              >
                                <Eye className="mr-0.5 h-2.5 w-2.5" />
                                View
                              </Button>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="p-2">
                            <h4 
                              className="text-xs font-semibold text-gray-800 mb-1 hover:text-orange-600 transition-colors cursor-pointer line-clamp-2 leading-tight"
                              onClick={() => handleViewDetails(product)}
                            >
                              {product.name}
                            </h4>

                            {/* Type Badge */}
                            {product.type && (
                              <div className="mb-1">
                                <span className="text-[9px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full font-semibold capitalize">
                                  {product.type}
                                </span>
                              </div>
                            )}

                            {/* Rating */}
                            <div className="flex items-center space-x-0.5 mb-1.5">
                              {[...Array(5)].map((_, i) => (
                                <Sparkles
                                  key={i}
                                  className={`h-2.5 w-2.5 ${
                                    i < Math.floor(rating)
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-[10px] text-gray-600 ml-1 font-medium">
                                {rating.toFixed(1)}
                              </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline space-x-1 mb-2">
                              <div className="text-base font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                ₹{discountedPrice.toLocaleString()}
                              </div>
                              {discount > 0 && (
                                <span className="text-[10px] text-gray-500 line-through">
                                  ₹{price.toLocaleString()}
                                </span>
                              )}
                            </div>

                            {/* Availability */}
                            {product.availability === 'out-of-stock' && (
                              <div className="mb-1.5 text-red-600 text-[9px] font-semibold">
                                Out of Stock
                              </div>
                            )}

                            {/* View Details Button */}
                            <div className="flex space-x-1">
                              <Button
                                variant="outline"
                                className="w-full h-7 px-2 text-[10px] border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold transition-all"
                                onClick={() => handleViewDetails(product)}
                              >
                                <Eye className="mr-0.5 h-2.5 w-2.5" /> View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="mt-3 flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="h-1 bg-orange-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full transition-all duration-300 shadow-lg"
                        style={{ width: `${scrollProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-[9px] text-gray-600 font-medium">
                      <span>Scroll to explore</span>
                      <span>{Math.round(scrollProgress)}%</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-600">
                <Sparkles className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-xs">No products found for this category.</p>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default NewCategories;