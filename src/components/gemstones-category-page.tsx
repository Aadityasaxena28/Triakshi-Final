import { getProducts } from "@/API/Product";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Filter, Search, X, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product_card from "./Product_card";

// ---------- Types ----------
interface ProductType {
  id: string;
  name: string;
  description: string;
  price?: number;
  image?: string;
  [key: string]:unknown;
}

interface CategoryMap {
  [key: string]: {
    label: string;
    subcategories: {
      [key: string]: string;
    };
  };
}

interface MobileCategoryIcon {
  key: string;
  label: string;
  parent: string;
  image: string | null;
}

// ---------- Component ----------
const GemstonesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [productCount] = useState<number>(40);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_api_url || "https://localhost:5000";

  const effectiveCategory = useMemo(
    () => (selectedSubcategory !== "all" ? selectedSubcategory : selectedCategory),
    [selectedCategory, selectedSubcategory]
  );

  const { data: products = [], isLoading, isError } = useQuery<ProductType[]>({
    queryKey: ["Gem-products", effectiveCategory, page, productCount],
    queryFn: () =>
      getProducts({
        page,
        type: effectiveCategory === "all" ? undefined : effectiveCategory,
        category: "gemstone",
        productCount,
      }),
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [effectiveCategory]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    const q = searchQuery.toLowerCase();

    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q) ||
        product.id?.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  const categories: CategoryMap = {
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
        vaidurya: "Vaidurya",
      },
    },
    semiPrecious: {
      label: "Semi-Precious (Upratna)",
      subcategories: {
        sulemani: "Sulemani",
        safedPukhraj: "Safed Pukhraj",
        haritTurmali: "Harit Turmali",
        chandrakant: "Chandrakant",
        gomedak: "Gomedak",
        sunehla: "Sunehla",
        jamuniya: "Jamuniya",
        santreeGomed: "Santree Gomed",
        vaiduryaUpratna: "Vaidurya Upratna",
      },
    },
  };

  const categoryImages: Record<string, string | null> = {
    all: null,
    moonga: `$/images/categories/moonga.jpg`,
    heera: `$/images/categories/heera.jpg`,
    panna: `$/images/categories/panna.jpg`,
    moti: `$/images/categories/moti.jpg`,
    manik: `$/images/categories/manik.jpg`,
    pukhraj: `$/assets/Stones/YellowSapphire.png`,
    neelam: `$/images/categories/neelam.jpg`,
    gomed: `${baseUrl}/images/categories/gomed.jpg`,
    vaidurya: `${baseUrl}/images/categories/vaidurya.jpg`,
    sulemani: `${baseUrl}/images/categories/sulemani.jpg`,
    safedPukhraj: `${baseUrl}/images/categories/safed-pukhraj.jpg`,
    haritTurmali: `${baseUrl}/images/categories/harit-turmali.jpg`,
    chandrakant: `${baseUrl}/images/categories/chandrakant.jpg`,
    gomedak: `${baseUrl}/images/categories/gomedak.jpg`,
    sunehla: `${baseUrl}/images/categories/sunehla.jpg`,
    jamuniya: `${baseUrl}/images/categories/jamuniya.jpg`,
    santreeGomed: `${baseUrl}/images/categories/santree-gomed.jpg`,
    vaiduryaUpratna: `${baseUrl}/images/categories/vaidurya-upratna.jpg`,
  };

  const allMobileCategories: MobileCategoryIcon[] = useMemo(() => {
    const arr: MobileCategoryIcon[] = [{ key: "all", label: "All", parent: "all", image: null }];

    Object.entries(categories).forEach(([parent, cat]) => {
      Object.entries(cat.subcategories).forEach(([subKey, subLabel]) => {
        arr.push({
          key: subKey,
          label: subLabel,
          parent,
          image: categoryImages[subKey],
        });
      });
    });

    return arr;
  }, []);

  const handleViewDetails = (id: string) => navigate(`/gem-view/${id}`);

  const handleCategoryClick = (catKey: string, parent: string) => {
    if (catKey === "all") {
      setSelectedCategory("all");
      setSelectedSubcategory("all");
    } else {
      setSelectedCategory(parent);
      setSelectedSubcategory(catKey);
    }
    setPage(1);
  };

  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  // -------- JSX --------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold">Gemstones Collection</h1>
          <p className="text-sm sm:text-base">Discover our exquisite gemstone collection</p>
        </div>
      </div>

      {/* MOBILE CATEGORY SCROLLER */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
        <div className="relative flex items-center">
          <button onClick={scrollLeft} className="absolute left-0 bg-gradient-to-r from-white to-transparent h-full px-2 flex items-center">
            <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg">
              <ChevronLeft className="w-4 h-4 text-white" />
            </div>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto px-12 py-3 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allMobileCategories.map((cat) => {
              const isSelected =
                (cat.key === "all" && selectedCategory === "all") || cat.key === selectedSubcategory;

              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryClick(cat.key, cat.parent)}
                  className={`flex flex-col items-center min-w-[70px] transition-all ${
                    isSelected ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full mb-1.5 overflow-hidden flex items-center justify-center transition-all ${
                      isSelected ? "ring-3 ring-yellow-400 scale-105 shadow-lg" : "ring-2 ring-gray-200"
                    }`}
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class='w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-300'>
                              <span class='text-xs font-bold text-yellow-800'>${cat.label
                                .substring(0, 2)
                                .toUpperCase()}</span>
                            </div>`;
                        }}
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center ${
                          isSelected
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                            : "bg-gradient-to-br from-gray-100 to-gray-200"
                        }`}
                      >
                        <Sparkles className={`w-6 h-6 ${isSelected ? "text-white" : "text-gray-500"}`} />
                      </div>
                    )}
                  </div>

                  <span className={`text-xs font-medium ${isSelected ? "text-yellow-600" : "text-gray-600"}`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button onClick={scrollRight} className="absolute right-0 bg-gradient-to-l from-white to-transparent h-full px-2 flex items-center">
            <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

        <div className="px-4 pb-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg"
          >
            <Filter className="w-4 h-4" />
            <Search className="w-4 h-4" />
            Advanced Filters & Search
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-8">
        <main className="flex-1">
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 rounded-full border-4 border-yellow-400 border-t-transparent"></div>
            </div>
          )}

          {isError && (
            <div className="text-center py-20 text-red-500 font-semibold">Failed to load products!</div>
          )}

          {/* PRODUCT GRID */}
          {!isLoading && !isError && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Product_card key={product.id} product={product} handleViewDetails={handleViewDetails} />
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div className="text-center py-16 text-gray-600">
              <Search className="w-14 h-14 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-sm text-gray-500">Try changing filters or search query</p>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default GemstonesPage;
