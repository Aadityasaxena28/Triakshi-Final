import { getProducts } from '@/API/Product';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Filter, Search, Sparkles, X, XCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from './Product_card';
import ekmukhi from '@/assets/1 mukhi.png';
import domukhi from '@/assets/2 mukhi.png';
import teenmukhi from '@/assets/3 mukhi.png';
import charmukhi from '@/assets/4 mukhi.png';
import pachmukhi from '@/assets/5 mukhi.png';
import sixmukhi from '@/assets/6 mukhi.png';
import satmukhi from '@/assets/7 mukhi.png';
import eightmukhi from '@/assets/8 mukhi.png';
import ninemukhi from '@/assets/9 mukhi.png';
import dasmukhi from '@/assets/10 mukhi.png';
import elevenmukhi from '@/assets/11 mukhi.png';
import baramukhi from '@/assets/12 mukhi.png';
import teramukhi from '@/assets/13 mukhi.png';
import chaudamukhi from '@/assets/14 mukhi.png';
import gaurishankar from '@/assets/Gauri Shankar.png';
import ganesha from '@/assets/ganehsa.png';
import trijuti from '@/assets/trijuti.webp';
import navdurga from '@/assets/navdurga.webp';
import laxmi from '@/assets/laxmi.webp';

const RudrakshPage = () => {
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
    { key: '2-mukhi', label: '2 Mukhi' },
    { key: '3-mukhi', label: '3 Mukhi' },
    { key: '4-mukhi', label: '4 Mukhi' },
    { key: '5-mukhi', label: '5 Mukhi' },
    { key: '6-mukhi', label: '6 Mukhi' },
    { key: '7-mukhi', label: '7 Mukhi' },
    { key: '8-mukhi', label: '8 Mukhi' },
    { key: '9-mukhi', label: '9 Mukhi' },
    { key: '10-mukhi', label: '10 Mukhi' },
    { key: '11-mukhi', label: '11 Mukhi' },
    { key: '12-mukhi', label: '12 Mukhi' },
    { key: '13-mukhi', label: '13 Mukhi' },
    { key: '14-mukhi', label: '14 Mukhi' },
    { key: 'gauri-shankar', label: 'Gauri Shankar' },
    { key: 'ganesha', label: 'Ganesha' },
    { key: 'trijuti', label: 'Saraswati Rudraksha' },
    { key: 'navdurga', label: 'Navdurga Rudraksha' },
    { key: 'laxmi', label: 'Laxmi Rudraksha' }
  ];

  const categoryImages = {
    all: null,
    '2-mukhi': domukhi,
    '3-mukhi': teenmukhi,
    '4-mukhi': charmukhi,
    '5-mukhi': pachmukhi,
    '6-mukhi': sixmukhi,
    '7-mukhi': satmukhi,
    '8-mukhi': eightmukhi,
    '9-mukhi': ninemukhi,
    '10-mukhi': dasmukhi,
    '11-mukhi': elevenmukhi,
    '12-mukhi': baramukhi,
    '13-mukhi': teramukhi,
    '14-mukhi': chaudamukhi,
    'gauri-shankar': gaurishankar,
    'ganesha': ganesha,
    'trijuti': trijuti,
    'navdurga': navdurga,
    'laxmi': laxmi,
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

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["Rudra-products", selectedCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: selectedCategory === 'all' ? undefined : selectedCategory,
        category: "rudraksha",
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
      const typeKey = `rudraksha:${selectedCategory}`;
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
    Navigate(`/rudra-view/${id}`);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Products...</h2>
          <p className="text-gray-500">Please wait while we fetch the best Rudraksha beads for you.</p>
        </div>
      </div>
    );
  } else if (isError) {
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
      {viewMode === 'detail' && selectedProduct ? (
        <div>Product Detail View</div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Rudraksha Collection</h1>
              <p className="text-sm sm:text-base text-orange-50">Discover sacred Rudraksha beads blessed with divine energy</p>
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
              {/* Desktop Sidebar Filter - FIXED WITH PROPER SCROLLING */}
              <aside className="hidden lg:block w-64 bg-white rounded-2xl shadow-card sticky top-8 flex flex-col" style={{ height: 'calc(100vh - 4rem)', maxHeight: '600px' }}>
                {/* Fixed Header */}
                <div className="p-6 border-b border-gray-100 flex-shrink-0">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-orange-500" />
                    Filters
                  </h2>
                </div>
                
                {/* Fixed Search Box */}
                <div className="px-6 pt-4 pb-3 flex-shrink-0">
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

                {/* Scrollable Category List */}
                <div className="flex-1 overflow-y-scroll px-6 pb-6 custom-scrollbar" style={{ minHeight: 0 }}>
                  <div className="mb-3">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Rudraksha
                    </button>
                  </div>

                  <div className="space-y-1 pb-2">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all ${
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
                          placeholder="Search rudraksha..."
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
                        All Rudraksha
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
                      ? 'All Rudraksha'
                      : categories.find(c => c.key === selectedCategory)?.label}
                  </h2>
                  <span className="text-gray-600">{filteredProducts.length} products</span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="flex flex-wrap gap-x-5 gap-y-6 sm:gap-x-6 sm:gap-y-8">
                     {filteredProducts.map((product) => (
                       <Product_card key={product.id} product={product} handleViewDetails={handleViewDetails} />
                     ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-12 sm:w-16 h-12 sm:h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                    <p className="text-sm sm:text-base text-gray-500">Try adjusting your filters or search query</p>
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
        
        /* Custom scrollbar for desktop sidebar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
          margin: 4px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #fb923c 0%, #fbbf24 100%);
          border-radius: 10px;
          border: 2px solid #f8f9fa;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #f97316 0%, #f59e0b 100%);
        }
        
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #fb923c #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default RudrakshPage;