import { getProducts } from '@/API/Product';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Filter, Search, Sparkles, X, XCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from './Product_card';

const TribhuvaniPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const baseUrl = import.meta.env.VITE_api_url || "https://localhost:5000";
  const [page, setPage] = useState(1);
  const productCount = import.meta.env.VITE_product_count;

  const categories = [
    { key: 'kapoor', label: 'Kapoor', icon: '🕉️' },
    { key: 'incense', label: 'Incense', icon: '🔥' },
    { key: 'essential-oils', label: 'Essential Oils', icon: '💧' }
  ];

  const allMobileCategories = useMemo(() => {
    const cats = [{ key: 'all', label: 'All', icon: '✨' }];
    categories.forEach((cat) => {
      cats.push({ 
        key: cat.key, 
        label: cat.label,
        icon: cat.icon
      });
    });
    return cats;
  }, []);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["tribhuvani-products", selectedCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: selectedCategory === 'all' ? undefined : selectedCategory,
        category: "Tribhuvani",
        productCount,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2
  });

  const getFilteredProducts = () => {
    let filtered = [];

    if (selectedCategory === 'all') {
      filtered = products.slice();
    } else {
      const typeKey = `tribhuvani:${selectedCategory}`;
      filtered = products.filter(p => p.type === typeKey);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    return filtered;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  const Navigate = useNavigate();
  const filteredProducts = getFilteredProducts();

  const handleViewDetails = (id: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    Navigate(`/tribhuvani-view/${id}`);
  };

  const handleCategoryClick = (catKey: string) => {
    setSelectedCategory(catKey);
    setPage(1);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-200 h-32 w-32 mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-orange-900">Loading Products...</h2>
          <p className="text-orange-600">Please wait while we fetch the best Tribhuvani items for you.</p>
        </div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-orange-900">Failed to Load Products</h2>
          <p className="text-orange-600">There was an error fetching the products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {viewMode === 'detail' && selectedProduct ? (
        <div>Product Detail View</div>
      ) : (
        <>
          {/* Header - Orange Gradient */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Tribhuvani Collection</h1>
              <p className="text-sm sm:text-base text-orange-50">Discover sacred items for spiritual awakening and divine blessings</p>
            </div>
          </div>

          {/* Mobile Category Icons Section */}
          <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
            <div className="relative flex items-center">
              <button
                onClick={scrollLeft}
                className="absolute left-0 z-10 bg-gradient-to-r from-white to-transparent h-full px-2 flex items-center"
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
                        className={`w-14 h-14 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-400 ring-3 ring-orange-400 shadow-lg scale-105'
                            : 'bg-gradient-to-br from-orange-100 to-yellow-100 ring-2 ring-orange-200'
                        }`}
                      >
                        <span className={`text-2xl ${isSelected ? 'scale-110' : ''}`}>{cat.icon}</span>
                      </div>
                      <span
                        className={`text-xs font-medium text-center leading-tight ${
                          isSelected ? 'text-orange-600' : 'text-orange-700'
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
                <div className="bg-orange-400 rounded-full p-1.5 shadow-lg">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            <div className="px-4 pb-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-orange-100 text-orange-700 py-2.5 px-4 rounded-lg font-medium shadow-sm active:scale-95 transition-transform"
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
                <div className="p-6 border-b border-orange-100">
                  <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-orange-500" />
                    Filters
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* All Tribhuvani */}
                  <div className="mb-4">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg'
                          : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                      }`}
                    >
                      All Tribhuvani Items
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center gap-2 ${
                          selectedCategory === category.key
                            ? 'bg-orange-100 text-orange-800 font-semibold'
                            : 'text-orange-700 hover:bg-orange-50'
                        }`}
                      >
                        <span className="text-base">{category.icon}</span>
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
                  <div className="flex items-center justify-between p-4 border-b border-orange-200 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400">
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
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search items..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
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
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-md'
                            : 'bg-orange-50 text-orange-900 active:bg-orange-100'
                        }`}
                      >
                        All Tribhuvani Items
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
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center gap-2 ${
                            selectedCategory === category.key
                              ? 'bg-orange-100 text-orange-800 font-semibold'
                              : 'text-orange-700 active:bg-orange-50'
                          }`}
                        >
                          <span className="text-base">{category.icon}</span>
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-orange-200">
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-3 px-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
                    >
                      Show Products
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <main className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-orange-900">
                    {selectedCategory === 'all'
                      ? 'All Tribhuvani Items'
                      : categories.find(c => c.key === selectedCategory)?.label}
                  </h2>
                  <span className="text-orange-700">{filteredProducts.length} products</span>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="flex flex-wrap gap-y-4">
                    {filteredProducts.map((product) => (
                      <Product_card 
                        key={product.id} 
                        product={product} 
                        category="tribhuvani" 
                        handleViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <div className="text-orange-300 mb-4">
                      <Search className="w-12 sm:w-16 h-12 sm:h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-orange-900 mb-2">No products found</h3>
                    <p className="text-sm sm:text-base text-orange-600">Try adjusting your filters or search query</p>
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
        .loader {
          border-top-color: #fb923c;
          animation: spinner 1.5s linear infinite;
        }
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TribhuvaniPage;