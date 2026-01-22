import { getProducts } from "@/API/Product";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Filter, Search, X, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product_card from "./Product_card";
import pukhrajimage from "@/assets/Stones/YellowSapphire.png";
import moongaimage from "@/assets/Stones/Red_Coral.png";
import manikimage from "@/assets/Stones/Ruby.png";
import motiimage from "@/assets/Stones/Pearl.png";
import neelamimage from "@/assets/neelam.png";
import pannaimage from "@/assets/Stones/Emerald.jpg";
import opalimage from "@/assets/Stones/Opal.png";
import catseyeimage from "@/assets/Stones/CatsEye.png";
import tigereyeimage from "@/assets/Stones/tigereye.png";
import jadeimage from "@/assets/Stones/jade.png";
import sulemaniimage from "@/assets/Stones/sulemani.png";
import amethystimage from "@/assets/Stones/amethyst.png";
import roseimage from "@/assets/Stones/rosequartz.png";
import citrineimage from "@/assets/Stones/citrine.png";
import lapizimage from "@/assets/Stones/lapiz.png";
import moonstoneimage from "@/assets/Stones/moonstone.png";
import pyriteimage from "@/assets/Stones/pyrite.png";
import sodaimage from "@/assets/Stones/sodalite.png";
import topazimage from "@/assets/Stones/topaz.png";
import gomedicon from "@/assets/gomed_icon.png";

const GemstonesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [productCount] = useState(40);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        opal: "Opal",
        panna: "Panna",
        moti: "Moti",
        manik: "Manik",
        pukhraj: "Pukhraj",
        neelam: "Neelam",
        gomed: "Gomed",
        catseye:"Cat's Eye",
      },
    },
    semiPrecious: {
      label: "Semi-Precious (Upratna)",
      subcategories: {
        sulemani: "Sulemani hakik",
        tigereye:"Tiger's Eye",
        jade:"Jade",
        amethyst:"Amethyst",
        rosequartz:"Rose Quartz",
        citrine:"Citrine",
        lapizlazuli:"Lapiz Lazuli",
        moonstone:"Moonstone",
        pyrite:"Pyrite",
        sodalite:"Sodalite",
        topaz:"Topaz",
      },
    },
  };

  const stoneDescriptions = {
    moonga: "Moonga gemstone confidence, courage aur energy boost karta hai Mars ke powerful influence ke saath. Career growth, health strength aur negative energies se protection ke liye best mana jata hai.",
    opal: "Opal gemstone luxury, creativity aur emotional balance ko enhance karta hai apni beautiful shine ke saath. Love, attraction aur financial growth ke liye Venus ka strong stone mana jata hai.",
    panna: "Panna gemstone intelligence, communication aur decision-making power ko strong karta hai. Business success, education aur Mercury blessings ke liye highly recommended hai.",
    moti: "Moti gemstone mind ko calm karta hai aur emotional stability lata hai. Moon energy ko balance karke peace, relationships aur mental health improve karta hai.",
    manik: "Manik gemstone power, leadership aur self-confidence ko boost karta hai. Sun ke strong energy ke saath name, fame aur authority badhata hai.",
    pukhraj: "Pukhraj gemstone wealth, wisdom aur prosperity attract karta hai. Jupiter blessings ke liye career growth, marriage aur luck enhance karta hai.",
    neelam: "Neelam gemstone fast results dene ke liye jana jata hai life transformation mein. Saturn remedies ke liye success, discipline aur protection provide karta hai.",
    catseye: "Cat's Eye gemstone sudden losses aur negative energies se protection deta hai. Rahu-Ketu balance karke intuition aur stability ko strong karta hai.",
    sulemani: "Sulemani Hakik gemstone buri nazar aur negative energies se strong protection deta hai. Spiritual grounding, emotional strength aur inner peace ke liye popular hai.",
    tigereye: "Tiger's Eye gemstone confidence, courage aur focus ko boost karta hai. Fear remove karke decision-making aur leadership qualities improve karta hai.",
    jade: "Jade gemstone good luck, prosperity aur harmony ka symbol mana jata hai. Abundance attract karke emotional balance aur peace provide karta hai.",
    amethyst: "Amethyst gemstone stress relief aur mental calmness ke liye best hai. Meditation, positivity aur spiritual growth ko enhance karta hai.",
    rosequartz: "Rose Quartz gemstone love, healing aur emotional bonding ko strengthen karta hai. Relationships improve karne aur self-love badhane ke liye perfect stone hai.",
    citrine: "Citrine gemstone wealth, success aur positive energy attract karta hai. Business growth aur financial abundance ke liye 'merchant stone' ke naam se famous hai.",
    lapizlazuli: "Lapiz Lazuli gemstone wisdom, confidence aur self-expression ko boost karta hai. Communication skills aur spiritual awareness enhance karta hai.",
    moonstone: "Moonstone gemstone emotions ko balance karta hai aur intuition ko strong banata hai. New beginnings, calmness aur feminine energy ke liye ideal mana jata hai.",
    pyrite: "Pyrite gemstone protection aur wealth attraction ke liye jana jata hai. Confidence boost karta hai aur negative energy se shield provide karta hai.",
    sodalite: "Sodalite gemstone clarity, logic aur emotional stability ko improve karta hai. Stress kam karke communication aur focus ko better banata hai.",
    topaz: "Topaz gemstone confidence, creativity aur success ko attract karta hai. Happiness, motivation aur overall positive vibes ke liye powerful stone hai.",
    gomed:"Gomedak gemstone also known as Hessonite is a powerful Rahu graha stone used in Vedic astrology for protection clarity and sudden growth."
  };

  const categoryImages = {
    all: null,
    moonga: moongaimage,
    opal: opalimage,
    panna: pannaimage,
    moti: motiimage,
    manik: manikimage,
    pukhraj: pukhrajimage,
    neelam: neelamimage,
    catseye:catseyeimage,
    tigereye:tigereyeimage,
    jade:jadeimage,
    gomed:gomedicon,
    sulemani: sulemaniimage,
    amethyst:amethystimage,
    rosequartz:roseimage,
    citrine:citrineimage,
    lapizlazuli:lapizimage,
    moonstone:moonstoneimage,
    pyrite: pyriteimage,
    sodalite:sodaimage,
    topaz:topazimage,
  };

  const allMobileCategories = useMemo(() => {
    const cats = [{ key: 'all', label: 'All', parent: 'all', image: null }];
    Object.entries(categories).forEach(([parentKey, category]) => {
      Object.entries(category.subcategories).forEach(([subKey, subLabel]) => {
        cats.push({ 
          key: subKey, 
          label: subLabel, 
          parent: parentKey,
          image: categoryImages[subKey] || null
        });
      });
    });
    return cats;
  }, []);

  const handleViewDetails = (id: string) => {
    navigate(`/gem-view/${id}`);
  };

  const handleFilterSelect = () => {
    setMobileFilterOpen(false);
  };

  const handleCategoryClick = (catKey: string, parentKey: string) => {
    if (catKey === 'all') {
      setSelectedCategory('all');
      setSelectedSubcategory('all');
    } else {
      setSelectedCategory(parentKey);
      setSelectedSubcategory(catKey);
    }
    setPage(1);
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

  const getCurrentStoneDescription = () => {
    if (selectedSubcategory !== 'all') {
      return stoneDescriptions[selectedSubcategory];
    }
    return null;
  };

  const getCurrentStoneName = () => {
    if (selectedSubcategory !== 'all') {
      for (const category of Object.values(categories)) {
        if (category.subcategories[selectedSubcategory]) {
          return category.subcategories[selectedSubcategory];
        }
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Gemstones Collection</h1>
          <p className="text-sm sm:text-base text-yellow-50">Discover our exquisite collection of precious and semi-precious gemstones</p>
        </div>
      </div>

      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
        <div className="relative flex items-center">
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-gradient-to-r from-white to-transparent h-full px-2 flex items-center"
          >
            <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg">
              <ChevronLeft className="w-4 h-4 text-white" />
            </div>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto px-12 py-3 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allMobileCategories.map((cat) => {
              const isSelected = (cat.key === 'all' && selectedCategory === 'all') || (cat.key === selectedSubcategory);
              
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryClick(cat.key, cat.parent)}
                  className={`flex flex-col items-center justify-center min-w-[70px] transition-all ${
                    isSelected ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-1.5 transition-all overflow-hidden ${
                      isSelected
                        ? 'ring-3 ring-yellow-400 shadow-lg scale-105'
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
                              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-300">
                                <span class="text-xs font-bold text-yellow-800">${cat.label.substring(0, 2).toUpperCase()}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        isSelected
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200'
                      }`}>
                        <Sparkles className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      isSelected ? 'text-yellow-600' : 'text-gray-600'
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
            <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg">
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
          <aside className="hidden lg:block w-80 bg-white rounded-2xl shadow-card p-6 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-6 h-6 text-yellow-500" />
                Filters
              </h2>
            </div>

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

              <div className="flex-1 overflow-y-auto p-4">
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

          <main className="flex-1">
            {getCurrentStoneDescription() && (
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 border-l-4 border-yellow-400">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  {getCurrentStoneName()}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {getCurrentStoneDescription()}
                </p>
              </div>
            )}

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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default GemstonesPage;