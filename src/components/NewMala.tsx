import { getProducts } from '@/API/Product';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Filter, Search, Sparkles, X, XCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './General/Loader';
import Product_card from './Product_card';
import carer from '@/assets/career (2).png';
import love from '@/assets/love life.png';
import health from '@/assets/health.png';
import finance from '@/assets/finance.png';

const NewMala = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const page = 1;
  const productCount = 40;
  const navigate = useNavigate();

  // Fetch Mala products only
  const { data: malaResponse, isLoading: malaLoading, isError: malaError } = useQuery({
    queryKey: ["mala-products", selectedCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: selectedCategory === 'all' ? undefined : selectedCategory,
        category: "mala",
        productCount,
      }),
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  const categories = [
    { key: 'career', label: 'Career', image: carer },
    { key: 'love life', label: 'Love Life', image: love },
    { key: 'finance', label: 'Finance', image: finance },
    { key: 'health', label: 'Health', image: health }
  ];

  const allMobileCategories = useMemo(() => {
    const cats = [{ key: 'all', label: 'All', image: null }];
    categories.forEach((cat) => {
      cats.push({ 
        key: cat.key, 
        label: cat.label,
        image: cat.image
      });
    });
    return cats;
  }, []);

  // Parse and filter mala products only
  const parseType = (t?: string) => {
    const [cat, cls] = String(t || "").toLowerCase().split(":").map(s => s.trim());
    return { cat, cls };
  };

  const normKey = selectedCategory.trim().toLowerCase().replace(/-/g, " "); 

  const filteredProducts = useMemo(() => {
    const toArr = (resp: any) => (Array.isArray(resp) ? resp : resp?.products || resp?.data || []);
    let products = toArr(malaResponse);

    // CRITICAL: Filter out any bracelets - only keep mala products
    products = products.filter((p: any) => {
      const category = String(p?.category ?? "").toLowerCase().trim();
      const type = String(p?.type ?? "").toLowerCase();
      const name = String(p?.name ?? "").toLowerCase();
      
      // Exclude if it's explicitly a bracelet
      if (category.includes('bracelet') || 
          category.includes('brace') ||
          type.includes('bracelet') || 
          type.includes('brace') ||
          name.includes('bracelet')) {
        return false;
      }
      
      // Only include if it's explicitly mala or has mala-related keywords
      return category === 'mala' || 
             category.includes('mala') || 
             type.includes('mala') ||
             name.includes('mala');
    });

    // Filter by selected category (career, love life, etc.)
    if (normKey !== "all") {
      products = products.filter((p: any) => {
        const parsed = parseType(p?.type);
        return parsed.cls === normKey || parsed.cat === normKey;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter((p: any) => {
        const idStr = String(p?._id ?? p?.id ?? "");
        return (
          String(p?.name ?? "").toLowerCase().includes(q) ||
          String(p?.description ?? "").toLowerCase().includes(q) ||
          idStr.toLowerCase().includes(q) ||
          String(p?.category ?? "").toLowerCase().includes(q) ||
          String(p?.type ?? "").toLowerCase().includes(q)
        );
      });
    }

    return products;
  }, [malaResponse, selectedCategory, searchQuery, normKey]);

  const handleViewDetails = (id: string) => {
    navigate(`/mala-brace-view/${id}`);
  };

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

  // Show loader while loading
  if (malaLoading) {
    return <Loader />;
  }

  // Show error state
  if (malaError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Failed to Load Products</h2>
          <p className="text-gray-500">There was an error fetching the products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Mala Collection</h1>
          <p className="text-sm sm:text-base text-orange-50">Discover sacred prayer malas crafted for your spiritual journey</p>
        </div>
      </div>

      {/* Mobile Category Icons Section */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
        <div className="relative flex items-center">
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-gradient-to-r from-white to-transparent h-full px-2 flex items-center"
            aria-label="Scroll left"
          >
            <div className="bg-orange-400 rounded-full p-1.5 shadow-lg">
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
                        ? 'ring-3 ring-orange-400 shadow-lg scale-105'
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
                              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-yellow-300">
                                <span class="text-xs font-bold text-orange-800">${cat.label.substring(0, 2).toUpperCase()}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        isSelected
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-500'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200'
                      }`}>
                        <Sparkles className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      isSelected ? 'text-orange-600' : 'text-gray-600'
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
            aria-label="Scroll right"
          >
            <div className="bg-orange-400 rounded-full p-1.5 shadow-lg">
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
          <aside className="hidden lg:block w-64 bg-white rounded-2xl shadow-card sticky top-8 h-[calc(100vh-6rem)] flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-500" />
                Filters
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Products
                </button>
              </div>

              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      selectedCategory === category.key
                        ? 'bg-orange-100 text-orange-800 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
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
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-400 to-yellow-500">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                  aria-label="Close filters"
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
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
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
                        ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 active:bg-gray-100'
                    }`}
                  >
                    All Products
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
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                        selectedCategory === category.key
                          ? 'bg-orange-100 text-orange-800 font-semibold'
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
                  className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
                >
                  Show Products
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'all' 
                  ? 'All Mala Products'
                  : categories.find(c => c.key === selectedCategory)?.label}
              </h2>
              <span className="text-gray-600">{filteredProducts.length} products</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="flex flex-wrap gap-y-4">
                {filteredProducts.map((product: any) => {
                  const pid = product._id || product.id;
                  return (
                    <Product_card
                      key={pid}
                      handleViewDetails={handleViewDetails}
                      product={product}
                      category={"mala"}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 sm:w-16 h-12 sm:h-16 mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No mala products found</h3>
                <p className="text-sm sm:text-base text-gray-500">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NewMala;