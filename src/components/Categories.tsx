import braceletImg from "@/assets/bracelet-category.jpg";
import gemstonesImg from "@/assets/gemstones-category.jpg";
import healthCalculatorImg from "@/assets/health.jpg";
import lucky from "@/assets/lucky.jpg";
import malaImg from "@/assets/mala-category.jpg";
import rudrakshImg from "@/assets/rudraksha-category.jpg";
import { Button } from "@/components/ui/button";
import { toastError } from "@/utlity/AlertSystem";
import { Calculator, Circle, CircleDot, Gem, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      title: "Gemstones",
      description: "Healing crystals and precious stones for spiritual growth",
      image: gemstonesImg,
      icon: Gem,
      color: "from-orange-500 to-amber-600",
      link: "/gemstones"
    },
    {
      title: "Rudraksh",
      description: "Sacred beads for meditation and spiritual protection",
      image: rudrakshImg,
      icon: Heart,
      color: "from-red-500 to-orange-500",
      link:"/rudraksha"
    },
    {
      title: "Mala",
      description: "Handcrafted malas for meditation, focus, and positive energy",
      image: malaImg,
      icon: CircleDot,
      color: "from-amber-500 to-yellow-500",
      link:"/mala"
    },
    {
      title: "Bracelets",
      description: "Elegant gemstone bracelets designed for balance and style",
      image: braceletImg,
      icon: Circle,
      color: "from-orange-600 to-amber-500",
      link:"/bracelet"
    },
    {
      title: "Lucky Gemstone",
      description: "Feng shui items and lucky charms for prosperity",
      image: lucky,
      icon: ShoppingBag,
      color: "from-yellow-500 to-orange-500",
      link: "/lucky-store"
    },
    {
      title: "Health Calculator",
      description: "Personalized recommendations based on your birth chart",
      image: healthCalculatorImg,
      icon: Calculator,
      color: "from-amber-500 to-orange-600",
      link: "/life-calculator"
    }
  ];
  const navigate = useNavigate();
  const handleExplore = (link:string)=>{
    try {
      navigate(link);
    } 
    catch (error) {
      toastError("Navigation Failed"+error);
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-yellow-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-orange-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-extrabold relative inline-block">
              <span 
                className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                }}
              >
                Explore Our Collections
              </span>
            </h2>
            <Sparkles className="w-7 h-7 text-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            ✨ Discover the perfect gemstone or spiritual item tailored to your needs and aspirations ✨
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="group bg-white border-2 border-orange-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 p-5 text-center relative"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  minHeight: '320px'
                }}
              >
                {/* Festive corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-bl-full"></div>

                {/* Image or Icon */}
                <div className="relative mb-5 overflow-hidden rounded-2xl">
                  {category.image ? (
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  ) : (
                    <div className={`aspect-square bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="h-16 w-16 text-white drop-shadow-lg" />
                    </div>
                  )}
                  
                  {/* Overlay Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-5">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 rounded-full px-6"
                      onClick={()=>handleExplore(category.link)}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Explore
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="mt-5 w-0 group-hover:w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-500 mx-auto rounded-full shadow-lg" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-700 mb-6 text-lg font-medium">
            🪔 Can't decide? Let our experts guide you to the perfect choice 🪔
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all rounded-full"
            onClick={() => {
              window.open('https://astroashoknarayan.com/home', '_blank');
            }}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Get Personal Consultation
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Categories;