import { addToCart } from "@/API/Cart";
import { getProductById } from "@/API/Product";
import { getProductReviews } from "@/API/ReviewAPI";
import { CartItem } from "@/DataTypes/CartData";
import { CheckoutDraft, CheckoutItem } from "@/DataTypes/Checkout";
import { getRelatedProducts } from "@/API/RelatedProducts";
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
  category?: "gemstone" | "rudraksha" | "mala" | "bracelet" | "tribhuvani" | "yantra" | string;
};

const THEME: Record<string, any> = {
  gemstone: {
    pageBgFrom: "from-yellow-50/30", pageBgTo: "to-yellow-50/30",
    headerFrom: "from-yellow-400", headerTo: "to-yellow-500",
    bandFrom: "from-yellow-50", bandTo: "to-yellow-100",
    overlayPulse: "bg-yellow-400/30", badgeWrap: "bg-yellow-400",
    badgeText: "text-gray-900", catChip: "bg-gray-100 text-gray-800 border border-gray-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",
    priceFrom: "from-yellow-600", priceTo: "to-yellow-600",
    qtyBorder: "border-yellow-100", dotActive: "bg-yellow-500", dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
  rudraksha: {
    pageBgFrom: "from-orange-50/30", pageBgTo: "to-yellow-50/30",
    headerFrom: "from-orange-500", headerTo: "to-yellow-500",
    bandFrom: "from-orange-50", bandVia: "via-white", bandTo: "to-yellow-100",
    overlayPulse: "bg-orange-400/20", badgeWrap: "bg-gradient-to-r from-orange-400 to-yellow-500",
    badgeText: "text-white", catChip: "bg-orange-50 text-orange-800 border-2 border-orange-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",
    priceFrom: "from-orange-600", priceTo: "to-yellow-600",
    qtyBorder: "border-orange-100", dotActive: "bg-orange-500", dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
  mala: {
    pageBgFrom: "from-orange-50/30", pageBgTo: "to-yellow-50/30",
    headerFrom: "from-orange-500", headerTo: "to-yellow-500",
    bandFrom: "from-orange-50", bandVia: "via-white", bandTo: "to-yellow-100",
    overlayPulse: "bg-orange-400/20", badgeWrap: "bg-gradient-to-r from-orange-400 to-yellow-500",
    badgeText: "text-white", catChip: "bg-orange-50 text-orange-800 border-2 border-orange-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",
    priceFrom: "from-orange-600", priceTo: "to-yellow-600",
    qtyBorder: "border-orange-100", dotActive: "bg-orange-500", dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
  bracelet: {
    pageBgFrom: "from-orange-50/30", pageBgTo: "to-yellow-50/30",
    headerFrom: "from-orange-500", headerTo: "to-yellow-500",
    bandFrom: "from-orange-50", bandVia: "via-white", bandTo: "to-yellow-100",
    overlayPulse: "bg-orange-400/20", badgeWrap: "bg-gradient-to-r from-orange-400 to-yellow-500",
    badgeText: "text-white", catChip: "bg-orange-50 text-orange-800 border-2 border-orange-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",
    priceFrom: "from-orange-600", priceTo: "to-yellow-600",
    qtyBorder: "border-orange-100", dotActive: "bg-orange-500", dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
  tribhuvani: {
    pageBgFrom: "from-purple-50/40", pageBgTo: "to-indigo-50/40",
    headerFrom: "from-purple-600", headerTo: "to-indigo-600",
    bandFrom: "from-purple-50", bandVia: "via-white", bandTo: "to-indigo-100",
    overlayPulse: "bg-purple-400/20", badgeWrap: "bg-gradient-to-r from-purple-500 to-indigo-600",
    badgeText: "text-white", catChip: "bg-purple-50 text-purple-800 border-2 border-purple-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",
    priceFrom: "from-purple-600", priceTo: "to-indigo-600",
    qtyBorder: "border-purple-100", dotActive: "bg-purple-500", dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
  yantra: {
    pageBgFrom: "from-amber-50/30", pageBgTo: "to-orange-50/30",
    headerFrom: "from-amber-600", headerTo: "to-orange-600",
    bandFrom: "from-amber-50", bandVia: "via-white", bandTo: "to-orange-100",
    overlayPulse: "bg-amber-400/20", badgeWrap: "bg-gradient-to-r from-amber-500 to-orange-600",
    badgeText: "text-white", catChip: "bg-amber-50 text-amber-800 border-2 border-amber-200",
    sizeChip: "bg-gray-50 text-gray-800 border-2 border-gray-200",
    priceFrom: "from-amber-600", priceTo: "to-orange-600",
    qtyBorder: "border-amber-100", dotActive: "bg-amber-500", dotIdle: "bg-gray-300 hover:bg-gray-400",
  },
};

const ProductDetailView: React.FC<Props> = ({ category = "gemstone" }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [discount, setDiscount] = React.useState(0);
  const [discountedPrice, setDiscountedPrice] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [benefits, setBenefits] = React.useState<string[]>([]);
  const [displayImages, setDisplayImages] = React.useState<string[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = React.useState(false);

  const BDK = import.meta.env.VITE_BUY_DRAFT_KEY;
  const theme = THEME[category] ?? THEME.gemstone;
  const reviewCount = 200;

  React.useEffect(() => {
    const fetchRelated = async (productId: string) => {
      try {
        setLoadingRelated(true);
        const related = await getRelatedProducts(productId, 0.2, 1, 8);
        setRelatedProducts(related || []);
      } catch (e) {
        console.error("Failed to load related products", e);
      } finally {
        setLoadingRelated(false);
      }
    };

    const fetchProduct = async () => {
      const productId = params.id || "MTI001";
      try {
        const fetchedProduct = await getProductById(productId);
        if (!fetchedProduct) return;

        setProduct(fetchedProduct);
        fetchRelated(fetchedProduct.id);

        const productReviews = await getProductReviews(productId);
        const mockReviews: Review[] = [
          {
            _id: "1",
            customer_name: "Rahul Sharma",
            rating: 5,
            comment: "Excellent quality gemstone! The authenticity certificate provided gives me complete confidence.",
            date: "2024-01-15",
            verified: true,
          },
        ];

        if (!productReviews || productReviews?.length === 0) {
          setReviews(mockReviews);
        } else {
          setReviews(productReviews);
        }

        let imagesToDisplay: string[] = [];
        if (Array.isArray(fetchedProduct.images) && fetchedProduct.images?.length > 0) {
          imagesToDisplay = [...fetchedProduct.images];
        } else if (fetchedProduct.image) {
          imagesToDisplay = [fetchedProduct.image];
        }
        setDisplayImages(imagesToDisplay);

        const d = Math.max(0, Math.min(100, fetchedProduct.discount ?? 0));
        setDiscount(d);
        const safePrice = typeof fetchedProduct.price === "number" ? fetchedProduct.price : 0;
        const discPrice = Math.round(safePrice * (1 - d / 100));

        setDiscountedPrice(discPrice);
        setBenefits(fetchedProduct.benefits || []);
        setTotalPrice(discPrice * 1);
        setQuantity(1);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error("Failed to fetch product data", error);
      }
    };

    fetchProduct();
  }, [params.id]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.id]);

  React.useEffect(() => {
    if (discountedPrice >= 0) {
      setTotalPrice(discountedPrice * quantity);
    }
  }, [quantity, discountedPrice]);

  async function handleAddToCart(productId: string, quantity: number) {
    try {
      const param: CartItem = { productId, quantity };
      const isAdded = await addToCart(param);
      if (isAdded) toastSuccess("Item Successfully Added to cart");
    } catch (error) {
      toastError(error || "Failed To Add Product");
    }
  }

  function handleBuyNow(product: Product, qty: number) {
    const isLoggedIn = !!localStorage.getItem("tg_user");
    if (!isLoggedIn) {
      navigate("/login");
      return;
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

  const nextImage = () => {
    if (displayImages.length > 0) {
      setCurrentImageIndex((p) => (p + 1) % displayImages.length);
    }
  };
  
  const prevImage = () => {
    if (displayImages.length > 0) {
      setCurrentImageIndex((p) => (p - 1 + displayImages.length) % displayImages.length);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-medium">
        Loading product details...
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.pageBgFrom} ${theme.pageBgTo}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.headerFrom} ${theme.headerTo} text-white py-3 px-4 shadow-lg sticky top-0 z-20`}>
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-white/20 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-lg font-semibold">{category === "rudraksha" ? "Rudraksha Details" : "Product Details"}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image Carousel */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className={["relative h-64 sm:h-96 flex items-center justify-center bg-gradient-to-br", theme.bandFrom, theme.bandVia ?? "", theme.bandTo].join(" ")}>
                {discount > 0 && (
                  <div className={`absolute top-3 right-3 ${theme.badgeWrap} ${theme.badgeText} px-3 py-1.5 rounded-full text-sm font-semibold z-30`}>
                    {discount}% OFF
                  </div>
                )}

                {displayImages.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-20"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-20"><ChevronRight className="w-5 h-5" /></button>
                  </>
                )}

                <div className="relative w-full h-full flex items-center justify-center">
                  <div className={`absolute inset-0 ${theme.overlayPulse} blur-3xl animate-pulse`}></div>
                  <img 
                    src={displayImages[currentImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-contain relative z-10 p-6" 
                  />
                </div>
              </div>
              
              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 justify-center p-3 bg-gray-50">
                  {displayImages.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${index === currentImageIndex ? `${theme.dotActive} w-8` : `${theme.dotIdle} w-2`}`}
                    />
                  ))}
                </div>
              )}

              <div className="p-4 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h2>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{reviewCount} reviews</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${theme.priceFrom} ${theme.priceTo} bg-clip-text text-transparent`}>
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  {discount > 0 && <span className="text-lg text-gray-400 line-through">₹{product.price?.toLocaleString()}</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${theme.catChip}`}>{category.toUpperCase()}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${theme.sizeChip}`}>Stock: {product.quantity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Purchase Card */}
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border-2 border-gray-100 rounded-lg overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-3 hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                  <span className="px-6 font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.quantity, q+1))} className="p-3 hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => handleAddToCart(product.id, quantity)} className="flex-1 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-all">
                  ADD TO CART
                </button>
              </div>
              <button onClick={() => handleBuyNow(product, quantity)} className={`w-full bg-gradient-to-r ${theme.headerFrom} ${theme.headerTo} text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2`}>
                <ShoppingCart className="w-5 h-5" /> BUY NOW
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description || "No description available."}</p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Authentic", color: "text-green-600" },
                { icon: Award, label: "Certified", color: "text-blue-600" },
                { icon: Zap, label: "Energized", color: "text-orange-600" }
              ].map((badge, i) => (
                <div key={i} className="bg-white p-3 rounded-xl shadow-md flex flex-col items-center">
                  <badge.icon className={`w-8 h-8 ${badge.color} mb-1`} />
                  <span className="text-[10px] font-bold text-gray-800 uppercase">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Enter Pincode" className="flex-1 text-sm outline-none" />
              <button className="text-red-600 font-bold text-sm">Check</button>
            </div>

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className={`bg-white rounded-2xl shadow-xl p-4 border-l-4 ${category === 'rudraksha' ? 'border-orange-500' : 'border-yellow-500'}`}>
                <h3 className="font-bold flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-orange-500" /> Benefits</h3>
                <ul className="space-y-2">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && <ProductReviewSlider reviews={reviews} category={category} />}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500" /> Related Products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.map((rp) => (
                <div 
                  key={rp.id} 
                  onClick={() => navigate(`/product/${rp.id}`)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                >
                  <div className="h-40 bg-gray-50 flex items-center justify-center p-4 group-hover:scale-105 transition-transform">
                    <img src={rp.image} alt={rp.name} className="h-full object-contain" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{rp.name}</h4>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold text-gray-900">₹{rp.price?.toLocaleString()}</span>
                      {rp.discount && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">{rp.discount}% OFF</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailView;