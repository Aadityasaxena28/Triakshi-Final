import { addToCart } from "@/API/Cart";
import { getProductById } from "@/API/Product";
import { getProductReviews } from "@/API/ReviewAPI";
import { CartItem } from "@/DataTypes/CartData";
import { CheckoutDraft, CheckoutItem } from "@/DataTypes/Checkout";
import type { Product } from "@/DataTypes/product";
import { Review } from "@/DataTypes/Review";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { setWithExpiry } from "@/utlity/Storage";
import { 
  AlertCircle, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Sparkles, 
  Star,
  Shield,
  Award,
  Zap,
  Gift,
  MapPin
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductReviewSlider } from "./ProductReviewSlider";

type Props = {
  category?: "gemstone" | "rudraksha" | string;
};

const THEME: Record<
  string,
  {
    pageBgFrom: string;
    pageBgTo: string;
    headerFrom: string;
    headerTo: string;
    bandFrom: string;
    bandVia?: string;
    bandTo: string;
    overlayPulse: string;
    badgeWrap: string;
    badgeText: string;
    catChip: string;
    sizeChip: string;
    priceFrom: string;
    priceTo: string;
    qtyBorder: string;
    outlineText: string;
    outlineBorder: string;
    dotActive: string;
    dotIdle: string;
  }
> = {
  gemstone: {
    pageBgFrom: "from-yellow-50/30",
    pageBgTo: "to-yellow-50/30",
    headerFrom: "from-yellow-400",
    headerTo: "to-yellow-500",

    bandFrom: "from-yellow-50",
    bandVia: undefined,
    bandTo: "to-yellow-100",
    overlayPulse: "bg-yellow-400/30",

    badgeWrap: "bg-yellow-400",
    badgeText: "text-gray-900",

    catChip: "bg-gray-100 text-gray-800 border border-gray-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",

    priceFrom: "from-yellow-600",
    priceTo: "to-yellow-600",

    qtyBorder: "border-yellow-100",

    outlineText: "text-gray-900",
    outlineBorder: "border-yellow-400 hover:border-yellow-500",

    dotActive: "bg-yellow-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
  },

  rudraksha: {
    pageBgFrom: "from-orange-50/30",
    pageBgTo: "to-yellow-50/30",
    headerFrom: "from-orange-500",
    headerTo: "to-yellow-500",

    bandFrom: "from-orange-50",
    bandVia: "via-white",
    bandTo: "to-yellow-100",
    overlayPulse: "bg-orange-400/20",

    badgeWrap: "bg-gradient-to-r from-orange-400 to-yellow-500",
    badgeText: "text-white",

    catChip: "bg-orange-50 text-orange-800 border-2 border-orange-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",

    priceFrom: "from-orange-600",
    priceTo: "to-yellow-600",

    qtyBorder: "border-orange-100",

    outlineText: "text-orange-600",
    outlineBorder: "border-orange-500",

    dotActive: "bg-orange-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
  },

  mala: {
    pageBgFrom: "from-orange-50/30",
    pageBgTo: "to-yellow-50/30",
    headerFrom: "from-orange-500",
    headerTo: "to-yellow-500",

    bandFrom: "from-orange-50",
    bandVia: "via-white",
    bandTo: "to-yellow-100",
    overlayPulse: "bg-orange-400/20",

    badgeWrap: "bg-gradient-to-r from-orange-400 to-yellow-500",
    badgeText: "text-white",

    catChip: "bg-orange-50 text-orange-800 border-2 border-orange-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",

    priceFrom: "from-orange-600",
    priceTo: "to-yellow-600",

    qtyBorder: "border-orange-100",

    outlineText: "text-orange-600",
    outlineBorder: "border-orange-500",

    dotActive: "bg-orange-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
  },

  bracelet: {
    pageBgFrom: "from-orange-50/30",
    pageBgTo: "to-yellow-50/30",
    headerFrom: "from-orange-500",
    headerTo: "to-yellow-500",

    bandFrom: "from-orange-50",
    bandVia: "via-white",
    bandTo: "to-yellow-100",
    overlayPulse: "bg-orange-400/20",

    badgeWrap: "bg-gradient-to-r from-orange-400 to-yellow-500",
    badgeText: "text-white",

    catChip: "bg-orange-50 text-orange-800 border-2 border-orange-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",

    priceFrom: "from-orange-600",
    priceTo: "to-yellow-600",

    qtyBorder: "border-orange-100",

    outlineText: "text-orange-600",
    outlineBorder: "border-orange-500",

    dotActive: "bg-orange-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
  tribhuvani: {
    pageBgFrom: "from-purple-50/40",
    pageBgTo: "to-indigo-50/40",

    headerFrom: "from-purple-600",
    headerTo: "to-indigo-600",

    bandFrom: "from-purple-50",
    bandVia: "via-white",
    bandTo: "to-indigo-100",
    overlayPulse: "bg-purple-400/20",

    badgeWrap: "bg-gradient-to-r from-purple-500 to-indigo-600",
    badgeText: "text-white",

    catChip: "bg-purple-50 text-purple-800 border-2 border-purple-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",

    priceFrom: "from-purple-600",
    priceTo: "to-indigo-600",

    qtyBorder: "border-purple-100",

    outlineText: "text-purple-700",
    outlineBorder: "border-purple-500 hover:border-indigo-600",

    dotActive: "bg-purple-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
  yantra: {
    pageBgFrom: "from-amber-50/30",
    pageBgTo: "to-orange-50/30",

    headerFrom: "from-amber-600",
    headerTo: "to-orange-600",

    bandFrom: "from-amber-50",
    bandVia: "via-white",
    bandTo: "to-orange-100",
    overlayPulse: "bg-amber-400/20",

    badgeWrap: "bg-gradient-to-r from-amber-500 to-orange-600",
    badgeText: "text-white",

    catChip: "bg-amber-50 text-amber-800 border-2 border-amber-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",

    priceFrom: "from-amber-600",
    priceTo: "to-orange-600",

    qtyBorder: "border-amber-100",

    outlineText: "text-amber-600",
    outlineBorder: "border-amber-500 hover:border-orange-600",

    dotActive: "bg-amber-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
};


const ProductDetailView: React.FC<Props> = ({ category = "gemstone" }) => {
  const params = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [discount, setDiscount] = React.useState(0);
  const [discountedPrice, setDiscountedPrice] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [benefits, setBenefits] = React.useState<string[]>([]);
  const [displayImages, setDisplayImages] = React.useState<string[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const navigate = useNavigate();
  const BDK = import.meta.env.VITE_BUY_DRAFT_KEY;
  const theme = THEME[category] ?? THEME.gemstone;

  // Mock review count
  const reviewCount = 247;

  React.useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(params.id || "MTI001");
      setProduct(fetchedProduct);
      const productReviews = await getProductReviews(params.id || "MTI001");
      setReviews(productReviews);
      
      // For now, you can use mock data:
      const mockReviews: Review[] = [
        {
          _id: "1",
          customer_name: "Rahul Sharma",
          rating: 5,
          comment: "Excellent quality gemstone! The authenticity certificate provided gives me complete confidence. Highly recommended for anyone seeking genuine spiritual products.",
          date: "2024-01-15",
          verified: true,
        },
        {
          _id: "2",
          customer_name: "Priya Patel",
          rating: 4,
          comment: "Beautiful product with great energy. Delivery was fast and packaging was secure. Minor color variation from photo but overall very satisfied.",
          date: "2024-01-10",
          verified: true,
        },
        {
          _id: "3",
          customer_name: "Amit Kumar",
          rating: 5,
          comment: "Authentic and powerful. I can feel the positive vibrations. The customer service team was very helpful in choosing the right product for my needs.",
          date: "2024-01-05",
          verified: false,
        },

      ];

      if(productReviews.length===0) setReviews(mockReviews);
      
      // Set up images array - prioritize images array over single image
      let imagesToDisplay: string[] = [];
      
      if (Array.isArray(fetchedProduct.images) && fetchedProduct.images.length > 0) {
        // Use the images array
        imagesToDisplay = [...fetchedProduct.images];
      } else if (fetchedProduct.image) {
        // Fallback to single image
        imagesToDisplay = [fetchedProduct.image];
      }
      
      setDisplayImages(imagesToDisplay);

      const d = Math.max(0, Math.min(100, fetchedProduct.discount ?? 0));
      setDiscount(d);

      const safePrice = typeof fetchedProduct.price === "number" ? fetchedProduct.price : 0;
      const discPrice = Math.round(safePrice * (1 - d / 100));
      setDiscountedPrice(discPrice);
      setBenefits(fetchedProduct.benefits || []);

      const initialQty = 1;
      setTotalPrice(discPrice * initialQty);
      setQuantity(1);
      setCurrentImageIndex(0);
    };
    fetchProduct();
  }, [params.id]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    if (discountedPrice >= 0) {
      setTotalPrice(discountedPrice * quantity);
    }
  }, [quantity, discountedPrice]);

  async function handleAddToCart(productId: string, quantity: number) {
    try {
      const param: CartItem = {
        productId,
        quantity
      };
      const isAdded = await addToCart(param);
      if (isAdded) {
        toastSuccess("Item Successfully Added to cart");
      }
    } catch (error) {
      toastError(error || "Failed To Add Product");
    }
  }

  function handleBuyNow(product: Product, qty: number) {
    const isLoggedIn: boolean = !!localStorage.getItem("tg_user");
    if (!isLoggedIn) {
      navigate("/login");
    }
    const item: CheckoutItem = {
      productId: product.id,
      name: product.name,
      qty,
      image: product.image,
      unitPrice: product.price ?? 0,
      discount: product.discount ?? 0,
      type: product.type,
    };

    const draft: CheckoutDraft = { items: [item], createdAt: Date.now() };

    setWithExpiry(BDK, draft, 15 * 60 * 1000);
    navigate("/checkout", { state: { from: "buy-now" } });
  }

  const handleRefundPolicyClick = () => {
    navigate("/refund-policy");
  };

  const onBack = () => window.history.back();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-medium" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        Loading product details...
      </div>
    );
  }

  const categoryLabel = category === "rudraksha" ? "Rudraksha" : "Gemstone";
  const originalPrice = product.price;

  const nextImage = () => {
    if (displayImages.length > 0) {
      setCurrentImageIndex((p) => {
        const newIndex = (p + 1) % displayImages.length;
        return newIndex;
      });
    }
  };
  
  const prevImage = () => {
    if (displayImages.length > 0) {
      setCurrentImageIndex((p) => {
        const newIndex = (p - 1 + displayImages.length) % displayImages.length;
        return newIndex;
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.pageBgFrom} ${theme.pageBgTo}`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.headerFrom} ${theme.headerTo} text-white py-3 px-4 sm:py-4 sm:px-5 shadow-lg sticky top-0 z-20`}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
          <button onClick={onBack} className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <h1 className="text-base sm:text-lg font-semibold tracking-tight">
              {category === "rudraksha" ? "Rudraksha Details" : "Product Details"}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column - Image Carousel */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              <div
                className={[
                  "relative h-64 sm:h-72 md:h-80 bg-gradient-to-br flex items-center justify-center overflow-visible",
                  theme.bandFrom,
                  theme.bandVia ?? "",
                  theme.bandTo,
                ].join(" ")}
              >
                {discount > 0 && (
                  <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${theme.badgeWrap} ${theme.badgeText} px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-30`}>
                    {discount}% OFF
                  </div>
                )}

                {/* Carousel Navigation */}
                {displayImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all z-20 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all z-20 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    </button>
                  </>
                )}

                <div className="relative w-full h-full flex items-center justify-center">
                  <div className={`absolute inset-0 ${theme.overlayPulse} blur-3xl rounded-full animate-pulse`}></div>
                  {displayImages.length > 0 ? (
                    <img
                      key={currentImageIndex}
                      src={displayImages[currentImageIndex]}
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain relative z-10 drop-shadow-2xl px-4"
                      onError={(e) => {
                        e.currentTarget.src = product.image || '';
                      }}
                    />
                  ) : (
                    <Star className="w-32 h-32 sm:w-40 sm:h-40 text-black/10 relative z-10 drop-shadow-2xl" />
                  )}

                  {displayImages.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 text-white bg-black/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs">
                      {currentImageIndex + 1} / {displayImages.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Indicators */}
              {displayImages.length > 1 && (
                <div className="flex gap-1.5 sm:gap-2 justify-center p-2.5 sm:p-3 bg-gray-50">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        index === currentImageIndex 
                          ? `${theme.dotActive} w-6 sm:w-7` 
                          : `${theme.dotIdle} w-2`
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Basic Info */}
              <div className="p-3 sm:p-4 border-t border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5">
                  {product.name}
                </h2>
                
                {/* Star Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    {reviewCount} reviews
                  </span>
                </div>

                <p className={`${category === "rudraksha" ? "text-orange-600" : "text-yellow-600"} font-medium text-xs sm:text-sm mb-3`}>
                  Product ID: {product.id}
                </p>

                <div className="flex items-baseline gap-2 mb-2.5">
                  <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${theme.priceFrom} ${theme.priceTo} bg-clip-text text-transparent`}>
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  {discount > 0 && originalPrice > discountedPrice && (
                    <span className="text-base sm:text-lg text-gray-400 line-through">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 mb-3">
                  Tax included • Free delivery over ₹299
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${theme.catChip}`}>
                    {categoryLabel}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${theme.sizeChip}`}>
                    Size / Qty: {product.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3 sm:space-y-4">
            {/* Quantity & Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 px-6">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={() => {
                    handleAddToCart(product.id, quantity);
                  }}
                >
                  <span className="text-sm">ADD TO CART</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                className={`w-full bg-gradient-to-r ${theme.headerFrom} ${theme.headerTo} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg`}
                onClick={() => {
                  handleBuyNow(product, quantity);
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">BUY NOW</span>
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                {product.description || "—"}
              </p>
            </div>

            {/* Trust Badges - Now below description on mobile */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2.5 sm:p-3">
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 mb-1" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-xs text-red-600 font-medium text-center leading-tight">
                    genuine rudraksha
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2.5 sm:p-3">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mb-1" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-xs text-red-600 font-medium text-center leading-tight">
                    quality guarantee
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2.5 sm:p-3">
                  <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600 mb-1" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-xs text-red-600 font-medium text-center leading-tight">
                    trustworthy brand
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Check */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Delivery</span>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-1 px-2.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-3 py-1.5 text-xs sm:text-sm text-red-600 font-semibold hover:bg-red-50 rounded-md transition-colors">
                  Check
                </button>
              </div>
            </div>

            {/* Exclusive Offer */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">EXCLUSIVE OFFERS</h3>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-dashed border-orange-300 rounded-lg p-2.5 sm:p-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5">
                      Free Rudraksha
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-700 mb-1.5">
                      Complimentary 5 Mukhi certified Rudraksha
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] sm:text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                        NAMASTE
                      </span>
                      <button className="text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 font-medium">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Note */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
              <button
                onClick={handleRefundPolicyClick}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
              >
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Specially Curated Item
              </button>

              <p className="text-red-600 text-[10px] sm:text-xs text-center leading-relaxed mt-1.5">
                Minor color variations or appearance differences may occur due to lighting, photography or screen display settings.
              </p>
            </div>

            {/* Benefits */}
            {(benefits?.length ?? 0) > 0 && (
              <div className={`bg-gradient-to-br ${category === "rudraksha" ? "from-orange-50" : "from-yellow-50"} to-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 border-2 ${theme.qtyBorder}`}>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className={`w-5 h-5 sm:w-6 sm:h-6 ${category === "rudraksha" ? "text-orange-600" : "text-yellow-600"}`} />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Benefits
                  </h3>
                </div>
                <ul className="space-y-2">
                  {benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${category === "rudraksha" ? "bg-orange-600" : "bg-yellow-600"} mt-1.5 flex-shrink-0`}></div>
                      <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Slider */}
            {reviews.length > 0 && (
              <ProductReviewSlider 
                reviews={reviews} 
                category={category} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;