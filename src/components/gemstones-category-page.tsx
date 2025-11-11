import { getProducts } from "@/API/Product";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from "./Product_card";

const GemstonesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [productCount] = useState(40);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_api_url || "https://localhost:5000";

  const effectiveCategory = useMemo(
    () => (selectedSubcategory !== "all" ? selectedSubcategory : selectedCategory),
    [selectedCategory, selectedSubcategory]
  );

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["Gem-products", effectiveCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: effectiveCategory === "all" ? undefined : effectiveCategory,
        category: "gemstone",
        productCount,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [effectiveCategory]);

  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const categories = {
    precious: {
      label: "Precious (Ratna)",
      subcategories: {
        moonga: "Moonga",
        heera: "Heera",
        panna: "Panna",
        moti: "Moti",
        manik: "Manik",
        pukhraj: "Pukhraj",
        neelam: "Neelam",
        gomed: "Gomed",
        vaidurya: "Vaidurya/Lahsuniya",
      },
    },
    semiPrecious: {
      label: "Semi-Precious (Upratna)",
      subcategories: {
        sulemani: "Sulemani",
        safedPukhraj: "Safed Pukhraj",
        haritTurmali: "Harit Turmali",
        chandrakant: "Chandrakant Mani",
        gomedak: "Gomedak",
        sunehla: "Sunehla",
        jamuniya: "Jamuniya",
        santreeGomed: "Santree Gomed",
        vaiduryaUpratna: "Vaidurya Uparatna",
      },
    },
  };

  const handleViewDetails = (id: string) => {
    navigate(`/gem-view/${id}`);
  };

  const handleFilterSelect = () => {
    setMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Gemstones Collection</h1>
          <p className="text-sm sm:text-base text-yellow-50">Discover our exquisite collection of precious and semi-precious gemstones</p>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md px-4 py-3">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
        >
          <Filter className="w-5 h-5" />
          Filters & Search
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-80 bg-white rounded-2xl shadow-card p-6 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-6 h-6 text-yellow-500" />
                Filters
              </h2>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search gemstones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* All Gemstones */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                  setPage(1);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Gemstones
              </button>
            </div>

            {/* Categories */}
            {Object.entries(categories).map(([categoryKey, category]) => (
              <div key={categoryKey} className="mb-6">
                <button
                  onClick={() => {
                    setSelectedCategory(categoryKey);
                    setSelectedSubcategory('all');
                    setPage(1);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all mb-2 ${
                    selectedCategory === categoryKey && selectedSubcategory === 'all'
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
                
                {/* Subcategories */}
                <div className="ml-4 mt-2 space-y-1">
                  {Object.entries(category.subcategories).map(([subKey, subLabel]) => (
                    <button
                      key={subKey}
                      onClick={() => {
                        setSelectedCategory(categoryKey);
                        setSelectedSubcategory(subKey);
                        setPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === categoryKey && selectedSubcategory === subKey
                          ? 'bg-yellow-100 text-yellow-800 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {subLabel}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Mobile Filter Modal */}
          <div
            className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
              mobileFilterOpen ? 'visible' : 'invisible'
            }`}
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                mobileFilterOpen ? 'opacity-50' : 'opacity-0'
              }`}
              onClick={() => setMobileFilterOpen(false)}
            />

            {/* Filter Panel */}
            <div
              className={`absolute inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${
                mobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
              } flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-yellow-400 to-yellow-500">
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

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search gemstones..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* All Gemstones */}
                <div className="mb-4">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                      setPage(1);
                      handleFilterSelect();
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 active:bg-gray-100'
                    }`}
                  >
                    All Gemstones
                  </button>
                </div>

                {/* Categories */}
                {Object.entries(categories).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="mb-4">
                    <button
                      onClick={() => {
                        setSelectedCategory(categoryKey);
                        setSelectedSubcategory('all');
                        setPage(1);
                        handleFilterSelect();
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg font-semibold text-sm transition-all mb-2 ${
                        selectedCategory === categoryKey && selectedSubcategory === 'all'
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 active:bg-gray-100'
                      }`}
                    >
                      {category.label}
                    </button>
                    
                    {/* Subcategories */}
                    <div className="ml-3 mt-1 space-y-1">
                      {Object.entries(category.subcategories).map(([subKey, subLabel]) => (
                        <button
                          key={subKey}
                          onClick={() => {
                            setSelectedCategory(categoryKey);
                            setSelectedSubcategory(subKey);
                            setPage(1);
                            handleFilterSelect();
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                            selectedCategory === categoryKey && selectedSubcategory === subKey
                              ? 'bg-yellow-100 text-yellow-800 font-semibold'
                              : 'text-gray-600 active:bg-gray-50'
                          }`}
                        >
                          {subLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
                >
                  Show Products
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
              </div>
            )}
            
            {isError && (
              <div className="text-center py-16">
                <h1 className="text-red-500 text-lg font-semibold">Failed to fetch products!</h1>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <Product_card key={product.id} product={product} handleViewDetails={handleViewDetails} />
                ))}
              </div>
            )}

            {!isError && !isLoading && filteredProducts.length === 0 && (
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
    </div>
  );
};

export default GemstonesPage;