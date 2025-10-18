import { addToCart } from '@/API/Cart';
import { getDiscountedProducts } from '@/API/Product';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/DataTypes/CartData';
import { Product } from '@/DataTypes/product';
import { toastError, toastSuccess } from '@/utlity/AlertSystem';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ShoppingCart,
  Sparkles,
  Star
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductSlider = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fetch discounted products using TanStack Query
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['discounted-products'],
    queryFn: () => getDiscountedProducts({
      category: '',
      type: '',
      count: 10,
      discount: 14
    }),
    staleTime: 1000 * 60 * 5,
  });

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
      
      // Add resize listener to recalculate on window resize
      window.addEventListener('resize', updateScrollProgress);
      
      // Recalculate after images load
      const timer = setTimeout(updateScrollProgress, 500);
      
      return () => {
        scrollElement.removeEventListener('scroll', updateScrollProgress);
        window.removeEventListener('resize', updateScrollProgress);
        clearTimeout(timer);
      };
    }
  }, [products]); // Re-run when products change

  const nextSlide = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const prevSlide = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleViewDetails = (product: Product) => {
    console.log('Viewing details for:', product);
    if (product.category.toLowerCase() === 'gemstone'||product.category.toLowerCase() === 'gemstones') {
      navigate(`/gem-view/${product.id}`);
    } else if (product.category.toLowerCase() === 'mala' || product.category === 'bracelet') {
      navigate(`/mala-brace-view/${product.id}`);
    } else if (product.category.toLowerCase() === 'rudraksha' ){
      navigate(`/rudra-view/${product.id}`);
    }
    else {
      navigate(`/rudra-view/${product.id}`);
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

  // Filter out products with invalid data
  const validProducts = products.filter(
    (product: Product) => 
      product && 
      product.price != null && 
      product.price > 0 &&
      product.name
  );

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading special offers...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>Failed to load discounted products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // No products state
  if (!validProducts || validProducts.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>No special offers available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Calculate max discount for display
  const maxDiscount = Math.max(...validProducts.map(p => p.discount || 0));

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animated gradient text */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
            <h2 className="text-5xl font-extrabold relative inline-block">
              <span 
                className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                }}
              >
                Diwali Sale
              </span>
            </h2>
            <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
            ✨ Limited time offers on premium gemstones, Rudraksha, Mala and Bracelets! ✨
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>Up to {maxDiscount}% OFF</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center md:justify-end mb-6 gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-white/80 backdrop-blur-sm border-orange-300 hover:bg-orange-100 hover:border-orange-400 shadow-lg transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-orange-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-white/80 backdrop-blur-sm border-orange-300 hover:bg-orange-100 hover:border-orange-400 shadow-lg transition-all"
          >
            <ChevronRight className="h-5 w-5 text-orange-600" />
          </Button>
        </div>

        {/* Scrollable Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar gap-6 pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {validProducts.map((product: Product) => {
            const price = product.price || 0;
            const discount = product.discount || 0;
            const discountedPrice = calculateDiscountedPrice(product);
            const savings = price - discountedPrice;
            const rating = product.rating || 0;
            const quantity = product.quantity || 0;

            return (
              <div
                key={product.id}
                className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white border-2 border-orange-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 relative overflow-hidden"
                style={{
                  scrollSnapAlign: "start",
                }}
              >
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10 animate-pulse">
                    {discount}% OFF
                  </div>
                )}

                {/* Savings Badge */}
                {savings > 0 && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                    Save ₹{savings}
                  </div>
                )}

                {/* Festive corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-bl-full"></div>

                {/* Image */}
                <div 
                  className="aspect-square overflow-hidden rounded-t-3xl relative cursor-pointer bg-gray-100"
                  onClick={() => handleViewDetails(product)}
                >
                  {getProductImage(product) ? (
                    <img
                      src={getProductImage(product)}
                      alt={product.name || 'Product'}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
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
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                      Quick View
                    </Button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <h3 
                    className="text-lg font-bold mb-2 text-gray-800 hover:text-orange-600 transition-colors line-clamp-2 cursor-pointer"
                    onClick={() => handleViewDetails(product)}
                  >
                    {product.name || 'Unnamed Product'}
                  </h3>

                  {/* Category Badge */}
                  {product.category && (
                    <div className="mb-2">
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold capitalize">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(rating)
                            ? "text-amber-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2 font-medium">
                      {rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      ₹{discountedPrice.toLocaleString()}
                    </span>
                    {discount > 0 && (
                      <span className="text-base text-gray-500 line-through">
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

                  {/* Limited Stock Warning */}
                  {quantity < 5 && quantity > 0 && (
                    <div className="mb-3 text-orange-600 text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Only {quantity} left in stock!
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 h-10 text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.availability === 'out-of-stock'}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add
                    </Button>
                    <Button
                      variant="outline"
                      className="h-10 px-4 text-sm border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold transition-all"
                      onClick={() => handleViewDetails(product)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Progress Bar */}
        <div className="mt-8 flex justify-center">
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

export default ProductSlider;