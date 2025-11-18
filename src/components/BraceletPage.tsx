import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Search,
  Sparkles,
  X
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import neelamimage from "@/assets/neelam.png";
const braceletData = {
  // (same bracelet data as your original)
};

const BraceletPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const baseUrl = import.meta.env.VITE_api_url || "https://localhost:5000";

  const categories = [
    { key: "career", label: "Career" },
    { key: "education", label: "Education" },
    { key: "love-life", label: "Love Life" },
    { key: "finance", label: "Finance" },
    { key: "health", label: "Health" },
  ];

  const categoryImages = {
    all: null,
    career: ,
    education: `${baseUrl}/images/categories/education.jpg`,
    love-life: `${baseUrl}/images/categories/love-life.jpg`,
    finance: `${baseUrl}/images/categories/finance.jpg`,
    health: ,
  };

  const allMobileCategories = useMemo(() => {
    const cats = [{ key: 'all', label: 'All', image: null }];
    categories.forEach((cat) => {
      cats.push({ 
        key: cat.key, 
        label: cat.label,
        image: categoryImages[cat.key] || null
      });
    });
    return cats;
  }, []);

  const getFilteredProducts = () => {
    let filtered: unknown[] = [];

    if (selectedCategory === "all") {
      Object.values(braceletData).forEach((products: any) =>
        filtered.push(...products)
      );
    } else {
      filtered = braceletData[selectedCategory] || [];
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product: any) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleCategoryClick = (catKey: string) => {
    setSelectedCategory(catKey);
  };

  const handleFilterSelect = () => {
    setMobileFilterOpen(false);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const ProductCard = ({ product }: { product: any }) => {
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const handleViewDetails = () => {
      setSelectedProduct(product);
      setViewMode("detail");
      setQuantity(1);
      setCurrentImageIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <div className="bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Sparkles className="w-24 h-24 text-amber-400/40" />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">
              {product.id}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
              {product.category}
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleViewDetails}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            View Details
          </button>
        </div>
      </div>
    );
  };

  const ProductDetailView = ({
    product,
    quantity,
    setQuantity,
    onBack,
  }: any) => {
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
    const totalPrice = product.price * quantity;
    const carouselImages = [0, 1, 2, 3];

    const nextImage = () =>
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    const prevImage = () =>
      setCurrentImageIndex(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
      );

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-orange-50/30">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-6 px-6 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Bracelet Details</h1>
            </div>
          </div>
        </div>

        {/* (Same structure below with purple → amber/orange replacements) */}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === "detail" && selectedProduct ? (
        <ProductDetailView
          product={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          onBack={() => setViewMode("list")}
        />
      ) : (
        <>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Bracelet Collection</h1>
              <p className="text-sm sm:text-base text-amber-50">
                Discover powerful crystal bracelets for every aspect of life
              </p>
            </div>
          </div>

          {/* Mobile Category Icons Section */}
          <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
            <div className="relative flex items-center">
              <button
                onClick={scrollLeft}
                className="absolute left-0 z-10 bg-gradient-to-r from-white to-transparent h-full px-2 flex items-center"
              >
                <div className="bg-amber-400 rounded-full p-1.5 shadow-lg">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </div>
              </button>

              <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto px-12 py-3 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {allMobileCategories.map((cat) => {
                  const isSelected = cat.key === selectedCategory;
                  
                  return (
                    <button
                      key={cat.key}
                      onClick={() => handleCategoryClick(cat.key)}
                      className={`flex flex-col items-center justify-center min-w-[70px] transition-all ${
                        isSelected ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center mb-1.5 transition-all overflow-hidden ${
                          isSelected
                            ? 'ring-3 ring-amber-400 shadow-lg scale-105'
                            : 'ring-2 ring-gray-200'
                        }`}
                      >
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-300">
                                    <span class="text-xs font-bold text-amber-800">${cat.label.substring(0, 2).toUpperCase()}</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                              : 'bg-gradient-to-br from-gray-100 to-gray-200'
                          }`}>
                            <Sparkles className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium text-center leading-tight ${
                          isSelected ? 'text-amber-600' : 'text-gray-600'
                        }`}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={scrollRight}
                className="absolute right-0 z-10 bg-gradient-to-l from-white to-transparent h-full px-2 flex items-center"
              >
                <div className="bg-amber-400 rounded-full p-1.5 shadow-lg">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            <div className="px-4 pb-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium shadow-sm active:scale-95 transition-transform"
              >
                <Filter className="w-4 h-4" />
                <Search className="w-4 h-4" />
                Advanced Filters & Search
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <div className="flex gap-8">
              {/* Desktop Sidebar Filter */}
              <aside className="hidden lg:block w-64 bg-white rounded-2xl shadow-card p-6 h-fit sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-amber-500" />
                    Filters
                  </h2>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Bracelets
                  </button>
                </div>

                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all ${
                        selectedCategory === category.key
                          ? 'bg-amber-100 text-amber-800 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Mobile Filter Modal */}
              <div
                className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
                  mobileFilterOpen ? 'visible' : 'invisible'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    mobileFilterOpen ? 'opacity-50' : 'opacity-0'
                  }`}
                  onClick={() => setMobileFilterOpen(false)}
                />

                <div
                  className={`absolute inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${
                    mobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
                  } flex flex-col`}
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-amber-400 to-orange-500">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Filters
                    </h2>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search bracelets..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          handleFilterSelect();
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                          selectedCategory === 'all'
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 active:bg-gray-100'
                        }`}
                      >
                        All Bracelets
                      </button>
                    </div>

                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category.key}
                          onClick={() => {
                            setSelectedCategory(category.key);
                            handleFilterSelect();
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all ${
                            selectedCategory === category.key
                              ? 'bg-amber-100 text-amber-800 font-semibold'
                              : 'text-gray-600 active:bg-gray-50'
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
                    >
                      Show Products
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <main className="flex-1">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search query</p>
                  </div>
                )}
              </main>
            </div>
          </div>
        </>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BraceletPage;