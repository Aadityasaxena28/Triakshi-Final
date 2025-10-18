import { addToCart } from "@/API/Cart";
import { getProducts } from "@/API/Product";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/DataTypes/CartData";
import { Product } from "@/DataTypes/product";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Coins,
  Eye,
  GraduationCap,
  Heart,
  Shield,
  ShoppingCart,
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

  const handleAddToCart = async (product: Product) => {
        try {
  
        const param:CartItem= {
          productId: product.id,
          quantity: 1
        };
        const isAdded = await addToCart(param);
        if (isAdded){
          toastSuccess("Item Successfully Added to cart")
        }
      } 
      catch (error) {
        toastError(error||"Failed To Add Product")
      }
  
      };

  const getProductImage = (product: Product) => {
    const baseUrl = import.meta.env.VITE_api_url || "http://localhost:5000";
    
    if (product.images && product.images[0]) {
      return `${baseUrl}${product.images[0]}`;
    } else if (product.image) {
      return `${baseUrl}${product.image}`;
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
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-40 w-40 h-40 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-orange-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-extrabold">
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
            <Sparkles className="w-7 h-7 text-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            ✨ Find the perfect mala or bracelet for your specific needs and aspirations ✨
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setScrollProgress(0);
                }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                    : "bg-white border-2 border-orange-200 text-gray-700 hover:border-orange-400 hover:shadow-lg"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-semibold text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12 text-red-600">
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
                  className="flex overflow-x-auto no-scrollbar gap-4 pb-4"
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
                        className="flex-shrink-0 w-[280px] sm:w-[300px]"
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <div className="bg-white border-2 border-orange-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 overflow-hidden relative group">
                          {/* Discount Badge */}
                          {discount > 0 && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                              {discount}% OFF
                            </div>
                          )}

                          {/* Category Badge */}
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 capitalize">
                            {product.category}
                          </div>

                          {/* Festive corner decoration */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-bl-full"></div>

                          {/* Image */}
                          <div 
                            className="aspect-square overflow-hidden rounded-t-3xl relative bg-gray-100 cursor-pointer"
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
                                <Sparkles className="w-16 h-16" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                            {/* Quick View Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-orange-600 hover:bg-orange-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(product);
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="p-5">
                            <h4 
                              className="text-lg font-bold text-gray-800 mb-2 hover:text-orange-600 transition-colors cursor-pointer line-clamp-2"
                              onClick={() => handleViewDetails(product)}
                            >
                              {product.name}
                            </h4>

                            {/* Type Badge */}
                            {product.type && (
                              <div className="mb-2">
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold capitalize">
                                  {product.type}
                                </span>
                              </div>
                            )}

                            {/* Rating */}
                            <div className="flex items-center space-x-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Sparkles
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(rating)
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-600 ml-2 font-medium">
                                {rating.toFixed(1)}
                              </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline space-x-2 mb-4">
                              <div className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                ₹{discountedPrice.toLocaleString()}
                              </div>
                              {discount > 0 && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{price.toLocaleString()}
                                </span>
                              )}
                            </div>

                            {/* Availability */}
                            {product.availability === 'out-of-stock' && (
                              <div className="mb-3 text-red-600 text-xs font-semibold">
                                Out of Stock
                              </div>
                            )}

                            {/* Buttons */}
                            <div className="flex space-x-2">
                              <Button 
                                className="flex-1 h-10 text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg"
                                onClick={() => handleAddToCart(product)}
                                disabled={product.availability === 'out-of-stock'}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add
                              </Button>
                              <Button
                                variant="outline"
                                className="h-10 px-4 text-sm border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold"
                                onClick={() => handleViewDetails(product)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="h-2 bg-orange-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full transition-all duration-300 shadow-lg"
                        style={{ width: `${scrollProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
                      <span>Scroll to explore</span>
                      <span>{Math.round(scrollProgress)}%</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-600">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>No products found for this category.</p>
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