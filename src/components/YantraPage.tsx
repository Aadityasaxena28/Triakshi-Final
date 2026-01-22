import { getProducts } from '@/API/Product';
import { useQuery } from '@tanstack/react-query';
import { Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from './Product_card';

// Define the product type
interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  originalPrice?: number;
  category: string;
  image?: string;
  [key: string]: any; // in case API has extra fields
}

const YantraPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const baseUrl = import.meta.env.VITE_api_url || 'https://localhost:5000';
  const [page, setPage] = useState<number>(1);
  const productCount = import.meta.env.VITE_product_count || 10;

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['yantra-products', page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: 'all',
        category: 'yantra',
        productCount,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const getFilteredProducts = (): Product[] => {
    let filtered = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
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
  }, []);

  const navigate = useNavigate();
  const filteredProducts = getFilteredProducts();

  const handleViewDetails = (id: string): void => {
    const product = filteredProducts.find((p) => p.id === id);
    if (product) setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/yantra-view/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Products...</h2>
          <p className="text-gray-500">
            Please wait while we fetch the sacred Yantras for you.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Failed to Load Products
          </h2>
          <p className="text-gray-500">
            There was an error fetching the products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Yantra Collection</h1>
          <p className="text-amber-50">
            Sacred geometric symbols for divine energy and spiritual harmony
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Yantras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-base border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Yantras</h2>
          <span className="text-gray-600">{filteredProducts.length} products</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="flex flex-wrap gap-y-4">
            {filteredProducts.map((product) => (
              <Product_card
                key={product.id}
                product={product}
                category="rudraksha"
                handleViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YantraPage;