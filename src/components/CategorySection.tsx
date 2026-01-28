import { useNavigate } from "react-router-dom";
import { Sparkles, Gem, Circle, Watch, Grid, Book } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
  gradient: string;
}

const CategorySection = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: "rudraksha",
      name: "Rudraksha",
      icon: <Circle className="w-8 h-8 md:w-10 md:h-10" />,
      path: "/rudraksha",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      id: "gemstones",
      name: "Gemstones",
      icon: <Gem className="w-8 h-8 md:w-10 md:h-10" />,
      path: "/gemstones",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: "mala",
      name: "Mala",
      icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" />,
      path: "/mala",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: "bracelets",
      name: "Bracelets",
      icon: <Watch className="w-8 h-8 md:w-10 md:h-10" />,
      path: "/bracelet",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: "yantra",
      name: "Yantra",
      icon: <Grid className="w-8 h-8 md:w-10 md:h-10" />,
      path: "/yantra",
      gradient: "from-red-500 to-rose-600",
    },
    {
      id: "tribhuvani",
      name: "Tribhuvani",
      icon: <Book className="w-8 h-8 md:w-10 md:h-10" />,
      path: "/tribhuvani",
      gradient: "from-indigo-500 to-violet-600",
    },
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="w-full py-8 md:py-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Explore Our Categories
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Discover spiritual products for your journey
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.path)}
              className="group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                {/* Icon Container */}
                <div className="mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className="text-sm md:text-base font-semibold text-center leading-tight">
                  {category.name}
                </h3>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;