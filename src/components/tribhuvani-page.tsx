import { getProducts } from '@/API/Product';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from './Product_card';

const TribhuvaniPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const baseUrl = import.meta.env.VITE_api_url || "https://localhost:5000";
  const [page, setPage] = useState(1);
  const productCount = import.meta.env.VITE_product_count;

  const categories = [
    { key: 'kapoor', label: 'Kapoor' },
    { key: 'incense', label: 'Incense' },
    { key: 'essential-oils', label: 'Essential Oils' }
  ];

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["tribhuvani-products", selectedCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: selectedCategory,
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
  });

  const Navigate = useNavigate();
  const filteredProducts = getFilteredProducts();

  const handleViewDetails = (id: string) => {
    const product = filteredProducts.find(p => p.id === id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    Navigate(`/tribhuvani-view/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Products...</h2>
          <p className="text-gray-500">Please wait while we fetch the best Tribhuvani items for you.</p>
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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Tribhuvani Collection</h1>
          <p className="text-purple-50">Discover sacred items for spiritual awakening and divine blessings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filter */}
          <aside className="w-64 bg-white rounded-2xl shadow-card sticky top-8 h-[calc(100vh-6rem)] flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-500" />
                Filters
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* All Tribhuvani */}
              <div className="mb-4">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
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
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all ${
                      selectedCategory === category.key
                        ? 'bg-purple-100 text-purple-800 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'all'
                  ? 'All Tribhuvani Items'
                  : categories.find(c => c.key === selectedCategory)?.label}
              </h2>
              <span className="text-gray-600">{filteredProducts.length} products</span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </div>
  );
};

export default TribhuvaniPage;