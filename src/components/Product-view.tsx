import { addToCart } from "@/API/Cart";
import { getProductById } from "@/API/Product";
import { CartItem } from "@/DataTypes/CartData";
import { CheckoutDraft, CheckoutItem } from "@/DataTypes/Checkout";
import type { Product } from "@/DataTypes/product";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { setWithExpiry } from "@/utlity/Storage";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Minus, Plus, ShoppingCart, Sparkles, Star, AlertCircle } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  
  const navigate = useNavigate();
  const BDK = import.meta.env.VITE_BUY_DRAFT_KEY;
  const theme = THEME[category] ?? THEME.gemstone;

  React.useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(params.id || "MTI001");
      setProduct(fetchedProduct);

      // Set up images array - prioritize images array over single image
      let imagesToDisplay: string[] = [];
      
      if (Array.isArray(fetchedProduct.images) && fetchedProduct.images.length > 0) {
        // Use the images array
        imagesToDisplay = [...fetchedProduct.images];
      } else if (fetchedProduct.image) {
        // Fallback to single image
        imagesToDisplay = [fetchedProduct.image];
      }
      
      console.log('Images to display:', imagesToDisplay);
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
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
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
        console.log('Next image - Current:', p, 'New:', newIndex, 'Total:', displayImages.length);
        return newIndex;
      });
    }
  };
  
  const prevImage = () => {
    if (displayImages.length > 0) {
      setCurrentImageIndex((p) => {
        const newIndex = (p - 1 + displayImages.length) % displayImages.length;
        console.log('Prev image - Current:', p, 'New:', newIndex, 'Total:', displayImages.length);
        return newIndex;
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.pageBgFrom} ${theme.pageBgTo}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.headerFrom} ${theme.headerTo} text-white py-6 px-6 shadow-lg sticky top-0 z-20`}>
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl font-bold">{category === "rudraksha" ? "Rudraksha Details" : "Product Details"}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Carousel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div
                className={[
                  "relative h-72 sm:h-96 bg-gradient-to-br flex items-center justify-center overflow-visible",
                  theme.bandFrom,
                  theme.bandVia ?? "",
                  theme.bandTo,
                ].join(" ")}
              >
                {discount > 0 && (
                  <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 ${theme.badgeWrap} ${theme.badgeText} px-2 py-1 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-lg font-bold shadow-lg z-30`}>
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
                        console.log('Prev button clicked');
                        prevImage();
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-20 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Next button clicked');
                        nextImage();
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-20 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
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
                      className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                      onError={(e) => {
                        console.error('Image failed to load:', displayImages[currentImageIndex]);
                        e.currentTarget.src = product.image || '';
                      }}
                    />
                  ) : (
                    <Star className="w-48 h-48 sm:w-64 sm:h-64 text-black/10 relative z-10 drop-shadow-2xl" />
                  )}

                  {displayImages.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
                      {currentImageIndex + 1} / {displayImages.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Indicators */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 justify-center p-4 bg-gray-50">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Thumbnail clicked - Index:', index);
                        setCurrentImageIndex(index);
                      }}
                      className={`h-3 rounded-full transition-all cursor-pointer ${index === currentImageIndex ? `${theme.dotActive} w-8` : `${theme.dotIdle} w-3`}`}
                    />
                  ))}
                </div>
              )}

              {/* Basic Info */}
              <div className="p-4 sm:p-6 border-t border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className={`${category === "rudraksha" ? "text-orange-600" : "text-yellow-600"} font-semibold text-base sm:text-lg mb-4`}>
                  Product ID: {product.id}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${theme.catChip}`}>
                    {categoryLabel}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${theme.sizeChip}`}>
                    Size / Qty: {product.quantity}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${theme.priceFrom} ${theme.priceTo} bg-clip-text text-transparent`}>
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  {discount > 0 && originalPrice > discountedPrice && (
                    <span className="text-xl sm:text-2xl text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>

              {/* No Return/Exchange Button & Color Variation Message */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2">
                <button
                  onClick={handleRefundPolicyClick}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  No Return, No Exchange
                </button>

                <p className="text-red-600 text-xs text-center leading-relaxed">
                  Minor color variations or appearance differences may occur due to lighting, photography or screen display settings.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description || "—"}</p>
            </div>

            {/* Quantity & Actions */}
            <div className={`bg-gradient-to-br from-white to-white rounded-3xl shadow-xl p-4 sm:p-6 border-2 ${theme.qtyBorder}`}>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Select Quantity</h3>
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-3xl font-bold text-gray-900 w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <p className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${theme.priceFrom} ${theme.priceTo} bg-clip-text text-transparent text-center mb-4`}>
                Total: ₹{totalPrice.toLocaleString()}
              </p>

              <div className="space-y-2.5">
                <button
                  className={`w-full bg-gradient-to-r ${theme.headerFrom} ${theme.headerTo} hover:opacity-95 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg transform hover:scale-105`}
                  onClick={() => handleBuyNow(product, quantity)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                </button>

                <button
                  className={`w-full bg-white hover:bg-gray-50 ${theme.outlineText} font-bold py-4 px-6 rounded-2xl shadow-lg border-2 ${theme.outlineBorder} transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg transform hover:scale-105`}
                  onClick={() => {
                    handleAddToCart(product.id, quantity);
                  }}
                >
                  <Heart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Benefits */}
            {(benefits?.length ?? 0) > 0 && (
              <div className={`bg-gradient-to-br ${category === "rudraksha" ? "from-orange-50" : "from-yellow-50"} to-white rounded-3xl shadow-xl p-4 sm:p-6 border-2 ${theme.qtyBorder}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className={`w-6 h-6 sm:w-8 sm:h-8 ${category === "rudraksha" ? "text-orange-600" : "text-yellow-600"}`} />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Benefits</h3>
                </div>
                <ul className="space-y-3">
                  {benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${category === "rudraksha" ? "bg-orange-600" : "bg-yellow-600"} mt-2 flex-shrink-0`}></div>
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;