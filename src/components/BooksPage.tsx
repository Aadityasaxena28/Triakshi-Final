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

const BooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const baseUrl = import.meta.env.VITE_api_url || 'https://localhost:5000';
  const [page, setPage] = useState<number>(1);
  const productCount = import.meta.env.VITE_product_count || 10;

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['books-products', page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: 'all',
        category: 'books',
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
    navigate(`/books-view/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-200 h-32 w-32 mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-orange-900">Loading Books...</h2>
          <p className="text-orange-600">
            Please wait while we fetch the sacred books for you.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-orange-900">
            Failed to Load Books
          </h2>
          <p className="text-orange-600">
            There was an error fetching the books. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Saffron Gradient */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Books Collection</h1>
          <p className="text-sm sm:text-base text-orange-50">
            Discover sacred scriptures and spiritual literature for enlightenment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 sm:w-5 h-4 sm:h-5" />
              <input
                type="text"
                placeholder="Search Books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-orange-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none shadow-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-900">All Books</h2>
          <span className="text-sm sm:text-base text-orange-700">{filteredProducts.length} books</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="flex flex-wrap gap-x-5 gap-y-6 sm:gap-x-6 sm:gap-y-8">
            {filteredProducts.map((product) => (
              <Product_card
                key={product.id}
                product={product}
                category="books"
                handleViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="text-orange-300 mb-4">
              <Search className="w-12 sm:w-16 h-12 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-orange-900 mb-2">
              No books found
            </h3>
            <p className="text-sm sm:text-base text-orange-600">Try adjusting your search query</p>
          </div>
        )}
      </div>

      <style>{`
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

export default BooksPage;