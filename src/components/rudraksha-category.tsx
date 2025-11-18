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

const RudrakshPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const baseUrl = import.meta.env.VITE_api_url || "https://localhost:5000";
  const [page, setPage] = useState(1);
  const productCount = import.meta.env.VITE_product_count;

  const categories = [
    { key: '1-mukhi', label: '1 Mukhi' },
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
    { key: 'ganesha', label: 'Ganesha' }
  ];

  const categoryImages = {
    all: null,
    '1-mukhi': ekmukhi,
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
    'ganesha': ganesha
  };

  const allMobileCategories = useMemo(() => {
    const cats = [{ key: 'all', label: 'All', image: null }];
    categories.forEach((cat) => {
      cats.push({ key: cat.key, label: cat.label, image: categoryImages[cat.key] || null });
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
    let filtered: any[] = [];

    if (selectedCategory === 'all') {
      filtered = products.slice();
    } else {
      const typeKey = `rudraksha:${selectedCategory}`;
      filtered = products.filter((p: any) => p.type === typeKey);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p: any) =>
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

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Error loading products.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ⭐ RESTORED SAFFRON TITLE */}
      <h1 className="text-center text-3xl font-extrabold text-orange-600 tracking-wide py-6">
        Rudraksha Collection
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex gap-8">

          {/* SIDEBAR */}
          <aside className="hidden lg:block w-64 bg-white rounded-2xl shadow-card sticky top-6"
            style={{ height: "calc(100vh - 6rem)" }}>

            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-500" />
                Filters
              </h2>
            </div>

            <div className="overflow-y-auto p-6 space-y-4"
              style={{ maxHeight: "calc(100vh - 10rem)" }}>

              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-orange-400 to-yellow-500 text-white"
                      : "bg-gray-50"
                  }`}
                >
                  All Rudraksha
                </button>
              </div>

              <div className="space-y-1 pb-10">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCategory(c.key)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs ${
                      selectedCategory === c.key
                        ? "bg-orange-100 text-orange-800 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "all"
                  ? "All Rudraksha"
                  : categories.find((c) => c.key === selectedCategory)?.label}
              </h2>
              <span className="text-gray-600">{filteredProducts.length} products</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p: any) => (
                <Product_card key={p.id} product={p} category="rudraksha" />
              ))}
            </div>
          </main>

        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default RudrakshPage;
