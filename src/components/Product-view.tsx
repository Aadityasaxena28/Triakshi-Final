import { addToCart } from "@/API/Cart";
import { getProductById } from "@/API/Product";
import { CartItem } from "@/DataTypes/CartData";
import { CheckoutDraft, CheckoutItem } from "@/DataTypes/Checkout";
import type { Product } from "@/DataTypes/product";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { setWithExpiry } from "@/utlity/Storage";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Minus, Plus, ShoppingCart, Sparkles, Star } from "lucide-react";
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

  // Same look as Rudraksha / Mala view
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
};


const ProductDetailView: React.FC<Props> = ({ category = "gemstone" }) => {
  const params = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [discount, setDiscount] = React.useState(0);
  const [discountedPrice, setDiscountedPrice] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [benefits, setBenefits] = React.useState<string[] >([]);
  const baseUrl = import.meta.env.VITE_api_url || "http://localhost:5000";
  const navigate= useNavigate();
  const BDK = import.meta.env.VITE_BUY_DRAFT_KEY;
  const theme = THEME[category] ?? THEME.gemstone;

  React.useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(params.id || "MTI001");
      setProduct(fetchedProduct);

      const d = Math.max(0, Math.min(100, fetchedProduct.discount ?? 0));
      setDiscount(d);

      const safePrice = typeof fetchedProduct.price === "number" ? fetchedProduct.price : 0;
      const discPrice = Math.round(safePrice * (1 - d / 100));
      setDiscountedPrice(discPrice);
      setBenefits(fetchedProduct.benefits || []);
      // console.log(fetchedProduct);
      const initialQty = 1;
      setTotalPrice(discPrice * initialQty);
      setQuantity(1);
      setCurrentImageIndex(0);
    };
    fetchProduct();
  }, [params.id]);
  React.useEffect(()=>{
    window.scrollTo({top:0, behavior:"smooth"});
  },[]);
  React.useEffect(() => {
    if (discountedPrice >= 0) {
      setTotalPrice(discountedPrice * quantity);
    }
  }, [quantity, discountedPrice]);
  async function handleAddToCart(productId:string,quantity:number){
    try {
      const param:CartItem= {
        productId,
        quantity
      };
      const isAdded = await addToCart(param);
      if (isAdded){
        toastSuccess("Item Successfully Added to cart")
      }
    } catch (error) {
      toastError(error||"Failed To Add Product")
    }
  } ;
  function handleBuyNow(product: Product, qty: number) {
    // Require login
    const isLoggedIn: boolean = !!localStorage.getItem("tg_user");
    if(!isLoggedIn){
      navigate("/login")
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
    // console.log("[BUY-NOW] key:", BDK, "payload:", draft);
    // console.log("[BUY-NOW] raw in storage:", sessionStorage.getItem(BDK));
    navigate("/checkout", { state: { from: "buy-now" } });
  }


  const onBack = () => window.history.back();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading product details...
      </div>
    );
  }

  // If you have real category/subcategory, plug them here.
  const categoryLabel = category === "rudraksha" ? "Rudraksha" : "Gemstone";
  const subcategoryName = product.type?.split(":")[1]?.replace(/-/g, " ") || "—";

  // Derive originalPrice for strike-through from discount
  const originalPrice = product.price;

  const carouselImages = [0, 1, 2, 3];
  const nextImage = () => setCurrentImageIndex((p) => (p + 1) % carouselImages.length);
  const prevImage = () => setCurrentImageIndex((p) => (p - 1 + carouselImages.length) % carouselImages.length);

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
                  "relative h-96 sm:h-[500px] bg-gradient-to-br flex items-center justify-center p-8",
                  theme.bandFrom,
                  theme.bandVia ?? "",
                  theme.bandTo,
                ].join(" ")}
              >
                {discount > 0 && (
                  <div className={`absolute top-6 right-6 ${theme.badgeWrap} ${theme.badgeText} px-5 py-2.5 rounded-full text-lg font-bold shadow-lg z-10`}>
                    {discount}% OFF
                  </div>
                )}

                {/* Carousel Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <div className="relative">
                  <div className={`absolute inset-0 ${theme.overlayPulse} blur-3xl rounded-full animate-pulse`}></div>
                  {Array.isArray(product.images) && product.images.length > 0 ? (
                  <img
                    src={`${baseUrl}${product.images[0]}`}
                    alt={product.name}
                    className="w-[22rem] h-[22rem] object-contain relative z-10 drop-shadow-2xl rounded"
                  />
                ) : product.image ? (
                  <img
                    src={`${baseUrl}${product.image}`}
                    alt={product.name}
                    className="w-[22rem] h-[22rem] object-contain relative z-10 drop-shadow-2xl rounded"
                  />
                ) : (
                  <Star className="w-72 h-72 text-black/10 relative z-10 drop-shadow-2xl" />
                )}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                    {currentImageIndex + 1} / {carouselImages.length}
                  </div>
                </div>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              {/* Thumbnail Indicators */}
              <div className="flex gap-2 justify-center p-4 bg-gray-50">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-3 rounded-full transition-all ${index === currentImageIndex ? `${theme.dotActive} w-8` : `${theme.dotIdle} w-3`}`}
                  />
                ))}
              </div>

              {/* Basic Info */}
              <div className="p-8 border-t border-gray-100">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{product.name}</h2>
                <p className={`${category === "rudraksha" ? "text-orange-600" : "text-yellow-600"} font-semibold text-lg mb-5`}>
                  Product ID: {product.id}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${theme.catChip}`}>
                    {categoryLabel}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${theme.sizeChip}`}>
                    Size / Qty: {product.quantity}
                  </span>
                </div>

                <div className="flex items-baseline gap-4 mb-4">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${theme.priceFrom} ${theme.priceTo} bg-clip-text text-transparent`}>
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  {discount > 0 && originalPrice > discountedPrice && (
                    <span className="text-2xl text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description || "—"}</p>
            </div>

            {/* Quantity & Actions */}
            <div className={`bg-gradient-to-br from-white to-white rounded-3xl shadow-xl p-8 border-2 ${theme.qtyBorder}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Quantity</h3>
              <div className="flex items-center justify-center gap-6 mb-6">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                >
                  <Minus className="w-6 h-6 text-gray-700" />
                </button>
                <span className="text-4xl font-bold text-gray-900 w-20 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <p className={`text-2xl font-bold bg-gradient-to-r ${theme.priceFrom} ${theme.priceTo} bg-clip-text text-transparent text-center mb-6`}>
                Total: ₹{totalPrice.toLocaleString()}
              </p>

              <div className="space-y-3">
                <button className={`w-full bg-gradient-to-r ${theme.headerFrom} ${theme.headerTo} hover:opacity-95 text-white font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:scale-105`}
                onClick={()=> handleBuyNow(product,quantity)}>
                  <ShoppingCart className="w-6 h-6" />
                  Buy Now
                </button>

                <button className={`w-full bg-white hover:bg-gray-50 ${theme.outlineText} font-bold py-5 px-8 rounded-2xl shadow-lg border-2 ${theme.outlineBorder} transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:scale-105`} 
                onClick={()=>{
                  handleAddToCart(product.id,quantity)
                }}>
                  <Heart className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Benefits */}
            {(benefits?.length ?? 0) > 0 && (
              <div className={`bg-gradient-to-br ${category === "rudraksha" ? "from-orange-50" : "from-yellow-50"} to-white rounded-3xl shadow-xl p-8 border-2 ${theme.qtyBorder}`}>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className={`w-8 h-8 ${category === "rudraksha" ? "text-orange-600" : "text-yellow-600"}`} />
                  <h3 className="text-2xl font-bold text-gray-900">Benefits</h3>
                </div>
                <ul className="space-y-4">
                  {benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={`w-2.5 h-2.5 rounded-full ${category === "rudraksha" ? "bg-orange-600" : "bg-yellow-600"} mt-2.5 flex-shrink-0`}></div>
                      <span className="text-gray-700 text-lg leading-relaxed">{benefit}</span>
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
