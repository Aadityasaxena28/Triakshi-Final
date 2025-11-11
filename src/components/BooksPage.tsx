import { ArrowLeft, BookOpen, Eye, Sparkles } from "lucide-react";
import React, { useState } from "react";

interface Book {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  author: string;
  pages: number;
  category: string;
}

const booksData: Book[] = [
  {
    id: "BK001",
    name: "Mystical Gemstones Guide",
    description: "Complete guide to understanding gemstones and their healing properties",
    price: 599,
    originalPrice: 799,
    author: "Triakshi",
    pages: 250,
    category: "Gemology",
  },
  {
    id: "BK002",
    name: "Crystal Healing Handbook",
    description: "Learn the ancient art of crystal healing and energy work",
    price: 499,
    originalPrice: 699,
    author: "Triakshi",
    pages: 180,
    category: "Healing",
  },
  {
    id: "BK003",
    name: "Vedic Astrology Basics",
    description: "Introduction to Vedic astrology and planetary influences",
    price: 799,
    originalPrice: 999,
    author: "Triakshi",
    pages: 320,
    category: "Astrology",
  },
  {
    id: "BK004",
    name: "Rudraksha Sacred Seeds",
    description: "Understanding the spiritual significance of Rudraksha beads",
    price: 449,
    originalPrice: 599,
    author: "Triakshi",
    pages: 150,
    category: "Spirituality",
  },
  {
    id: "BK005",
    name: "Yantra Meditation Guide",
    description: "Harness the power of sacred geometry for meditation",
    price: 699,
    originalPrice: 899,
    author: "Triakshi",
    pages: 220,
    category: "Meditation",
  },
  {
    id: "BK006",
    name: "Chakra Balancing Manual",
    description: "Balance your energy centers with ancient wisdom",
    price: 549,
    originalPrice: 749,
    author: "Triakshi",
    pages: 200,
    category: "Energy Healing",
  },
];

const BooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [selectedProduct, setSelectedProduct] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const getFilteredProducts = (): Book[] => {
    let filtered = booksData;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const ProductCard: React.FC<{ product: Book }> = ({ product }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleViewDetails = () => {
      setSelectedProduct(product);
      setViewMode("detail");
      setQuantity(1);
      setCurrentImageIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <div className="bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <BookOpen className="w-24 h-24 text-indigo-400/40" />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-semibold">
              {product.id}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
              {product.category}
            </span>
            <span className="text-xs text-gray-500">{product.pages} pages</span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={handleViewDetails}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            View Details
          </button>
        </div>
      </div>
    );
  };

  const ProductDetailView: React.FC<{
    product: Book;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    onBack: () => void;
  }> = ({ product, quantity, setQuantity, onBack }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const totalPrice = product.price * quantity;
    const carouselImages = [0, 1, 2, 3];

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-blue-50/30">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-6 px-6 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Book Details</h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image Carousel */}
            <div className="bg-white rounded-3xl shadow-elegant p-8">
              <div className="relative bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center mb-4">
                <BookOpen className="w-64 h-64 text-indigo-400/30" />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                    {discount}% OFF
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-center">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? "border-indigo-500 scale-110" : "border-gray-200 opacity-60"
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-indigo-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-elegant p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    <p className="text-indigo-600 font-semibold text-lg">by {product.author}</p>
                  </div>
                  <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold">
                    {product.id}
                  </span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <p className="text-sm text-indigo-600 font-semibold mb-1">Category</p>
                    <p className="text-gray-800 font-bold">{product.category}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-semibold mb-1">Pages</p>
                    <p className="text-gray-800 font-bold">{product.pages}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-2xl text-gray-400 line-through mb-1">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-700 font-semibold">Quantity:</span>
                    <div className="flex items-center border-2 border-indigo-200 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-indigo-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 font-bold text-lg border-x-2 border-indigo-200">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-indigo-50 transition-colors">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Total Price</p>
                    <p className="text-3xl font-bold text-indigo-600">₹{totalPrice.toLocaleString()}</p>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-elegant p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-indigo-500" />
                  About This Book
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Comprehensive guide written by {product.author}</p>
                  <p>• {product.pages} pages of detailed knowledge</p>
                  <p>• Perfect for both beginners and advanced practitioners</p>
                  <p>• High-quality print with beautiful illustrations</p>
                  <p>• Category: {product.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === "detail" && selectedProduct ? (
        <ProductDetailView product={selectedProduct} quantity={quantity} setQuantity={setQuantity} onBack={() => setViewMode("list")} />
      ) : (
        <>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-8 px-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-2">Books</h1>
              <p className="text-indigo-50 text-lg">Books by Triakshi</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder="Search books by title, category, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-indigo-200 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none text-lg"
                />
                <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-6 h-6" />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
                <p className="text-gray-500">Try adjusting your search query</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BooksPage;