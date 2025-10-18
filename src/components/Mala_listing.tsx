import { getProducts } from '@/API/Product';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './General/Loader';
import Product_card from './Product_card';
// Sample Mala product data
const malaData = {
  'career': [
    { id: 'MAL001', name: 'Professional Success Mala', category: 'Career', description: 'Handcrafted mala with Tiger Eye and Citrine beads to enhance career growth and professional success.', price: 2500, originalPrice: 3200, quantity: '108 Beads', benefits: ['Enhances career opportunities', 'Boosts confidence at workplace', 'Attracts success and recognition', 'Improves decision-making skills'] },
    { id: 'MAL002', name: 'Leadership Power Mala', category: 'Career', description: 'Premium mala with Black Tourmaline and Carnelian for leadership qualities and authority.', price: 3500, originalPrice: 4500, quantity: '108 Beads', benefits: ['Develops leadership qualities', 'Increases authority and respect', 'Enhances strategic thinking', 'Removes career obstacles'] }
  ],
  'education': [
    { id: 'MAL003', name: 'Student Excellence Mala', category: 'Education', description: 'Special mala with Lapis Lazuli and Clear Quartz for enhanced learning and concentration.', price: 2200, originalPrice: 2800, quantity: '108 Beads', benefits: ['Improves memory and retention', 'Enhances concentration', 'Boosts academic performance', 'Reduces exam stress'] },
    { id: 'MAL004', name: 'Scholar Wisdom Mala', category: 'Education', description: 'Premium mala with Amethyst and Fluorite for wisdom and intellectual growth.', price: 3200, originalPrice: 4000, quantity: '108 Beads', benefits: ['Develops analytical thinking', 'Enhances creative intelligence', 'Improves learning abilities', 'Brings clarity of thought'] }
  ],
  'love-life': [
    { id: 'MAL005', name: 'Romantic Harmony Mala', category: 'Love Life', description: 'Beautiful mala with Rose Quartz and Moonstone to attract love and harmony in relationships.', price: 2800, originalPrice: 3500, quantity: '108 Beads', benefits: ['Attracts true love', 'Strengthens relationships', 'Promotes emotional healing', 'Enhances romance and passion'] },
    { id: 'MAL006', name: 'Eternal Bond Mala', category: 'Love Life', description: 'Premium mala with Rhodonite and Pink Tourmaline for lasting relationships and marital bliss.', price: 4200, originalPrice: 5500, quantity: '108 Beads', benefits: ['Creates deep emotional bonds', 'Resolves relationship conflicts', 'Brings marital happiness', 'Attracts soulmate connection'] }
  ],
  'finance': [
    { id: 'MAL007', name: 'Wealth Abundance Mala', category: 'Finance', description: 'Powerful mala with Green Aventurine and Pyrite to attract wealth and financial prosperity.', price: 3000, originalPrice: 3800, quantity: '108 Beads', benefits: ['Attracts wealth and prosperity', 'Removes financial obstacles', 'Enhances business success', 'Brings good fortune'] },
    { id: 'MAL008', name: 'Money Magnet Mala', category: 'Finance', description: 'Premium mala with Citrine and Golden Rutile Quartz for financial abundance and success.', price: 4500, originalPrice: 6000, quantity: '108 Beads', benefits: ['Manifests wealth rapidly', 'Attracts multiple income sources', 'Ensures financial stability', 'Brings unexpected gains'] }
  ],
  'health': [
    { id: 'MAL009', name: 'Healing Energy Mala', category: 'Health', description: 'Therapeutic mala with Green Jade and Bloodstone for overall health and vitality.', price: 2600, originalPrice: 3300, quantity: '108 Beads', benefits: ['Promotes physical healing', 'Boosts immune system', 'Increases vitality and energy', 'Reduces stress and anxiety'] },
    { id: 'MAL010', name: 'Wellness Vitality Mala', category: 'Health', description: 'Premium mala with Turquoise and Red Jasper for complete wellness and strength.', price: 3800, originalPrice: 4800, quantity: '108 Beads', benefits: ['Enhances overall wellbeing', 'Strengthens physical body', 'Promotes mental peace', 'Balances chakras'] },
    { id: 'MAL011', name: 'Chakra Balance Mala', category: 'Health', description: 'Special seven-chakra mala with seven different gemstones for complete energy alignment.', price: 5500, originalPrice: 7000, quantity: '108 Beads', benefits: ['Balances all seven chakras', 'Harmonizes body-mind-spirit', 'Removes energy blockages', 'Promotes holistic health'] }
  ]
};

const Mala_listing = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const page = 1;
  const productCount = 40;
  const navigate = useNavigate();

  // Fetch Mala products
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

  // Fetch Bracelet products
  const { data: bracResponse, isLoading: bracLoading, isError: bracError } = useQuery({
    queryKey: ["bracelet-products", selectedCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: selectedCategory === 'all' ? undefined : selectedCategory,
        category: "bracelet",
        productCount,
      }),
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(selectedCategory)
  }, [selectedCategory]);

  const categories = [
    { key: 'career', label: 'Career' },
    { key: 'education', label: 'Education' },
    { key: 'love life', label: 'Love Life' },
    { key: 'finance', label: 'Finance' },
    { key: 'health', label: 'Health' }
  ];

  // Merge and filter products
const parseType = (t?: string) => {
  const [cat, cls] = String(t || "").toLowerCase().split(":").map(s => s.trim());
  return { cat, cls };
};

const normKey = selectedCategory.trim().toLowerCase().replace(/-/g, " "); 

const filteredProducts = useMemo(() => {
  const toArr = (resp: any) => (Array.isArray(resp) ? resp : resp?.products || resp?.data || []);
  const malaProducts = toArr(malaResponse);
  const bracProducts = toArr(bracResponse);

  let merged: any[] = [...malaProducts, ...bracProducts];

  if (normKey !== "all") {
    merged = merged.filter(p => parseType(p?.type).cls === normKey);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    merged = merged.filter(p => {
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

  return merged;
}, [malaResponse, bracResponse, selectedCategory, searchQuery]);


  const handleViewDetails = (id: string) => {
    navigate(`/mala-brace-view/${id}`);
  };

  // Show loader while loading
  if (malaLoading || bracLoading) {
    return <Loader />;
  }

  // Show error state
  if (malaError && bracError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error loading products</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Mala & Bracelet Collection</h1>
          <p className="text-orange-50">Discover sacred prayer malas and bracelets crafted for your spiritual journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <aside className="w-64 bg-white rounded-2xl shadow-card sticky top-8 h-[calc(100vh-6rem)] flex flex-col">
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

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'all' 
                  ? 'All Products'
                  : categories.find(c => c.key === selectedCategory)?.label}
              </h2>
              <span className="text-gray-600">{filteredProducts.length} products</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product: any) => {
                  const pid = product._id || product.id;
                  const { cat } = parseType(product?.type); // "mala" or "bracelet"
                  return (
                    <Product_card
                      key={pid}
                      handleViewDetails={(id: string) => navigate(`/mala-brace-view/${id}`)}
                      product={product}
                      category={"mala"} // or lock to "mala" if you prefer
                    />
                  );
                })}

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
  );
};

export default Mala_listing;
