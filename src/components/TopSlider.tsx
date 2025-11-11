import heroImage from "@/assets/hero-gemstones.jpg";
import slideImage2 from "@/assets/Slide2.jpg";
import slideImage3 from "@/assets/slide3.jpg";
import slideImage4 from "@/assets/slide4.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const TopSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    { 
      id: 1, 
      type: "hero", 
      image: heroImage, 
      bgColor: "from-black/70 to-black/50",
      title: "Gemstone",
      subtitle: "Collection",
      description: "Discover the mystical power of premium gemstones, carefully curated for healing, prosperity, and spiritual growth."
    },
    { id: 2, type: "image-only", image: slideImage2 },
    { id: 3, type: "image-only", image: slideImage3 },
    { id: 4, type: "image-only", image: slideImage4 },
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  return (
    <section className="relative h-[70vh] sm:h-[75vh] md:h-[85vh] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? "opacity-100 scale-100 z-10" 
                : index === (currentSlide - 1 + slides.length) % slides.length
                ? "opacity-0 scale-95 z-0"
                : "opacity-0 scale-105 z-0"
            }`}
          >
            {/* Hero Slide (Slide 1) */}
            {slide.id === 1 ? (
              <>
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} backdrop-blur-[1px]`} />
                </div>

                {/* Action Buttons - Top */}
                <div className="absolute top-6 sm:top-8 md:top-12 left-4 right-4 sm:left-8 sm:right-8 z-20 flex justify-between items-center">
                  <Button 
                    size="lg" 
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full px-6 sm:px-8 shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> 
                    <span className="text-sm sm:text-base">Trial Now</span>
                  </Button>

                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-full px-6 sm:px-8 shadow-2xl transition-all duration-300 hover:scale-105 border-none"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> 
                    <span className="text-sm sm:text-base font-semibold">Buy Now</span>
                  </Button>
                </div>

                {/* Hero Content - Center */}
                <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
                  <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl animate-fade-in">
                    <div className="space-y-2 sm:space-y-3">
                      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight drop-shadow-2xl">
                        {slide.title}
                      </h1>
                      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent leading-none tracking-tight animate-shimmer">
                        {slide.subtitle}
                      </h2>
                    </div>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg">
                      {slide.description}
                    </p>

                    {/* Decorative Elements */}
                    <div className="flex justify-center gap-2 sm:gap-3 pt-4 sm:pt-6">
                      <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
                      <div className="w-2 h-1 bg-amber-400 rounded-full" />
                      <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Image-Only Slides (2-4) */
              <div className="absolute inset-0 p-1 sm:p-2 md:p-3 bg-gradient-to-br from-slate-100 to-white">
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle Overlay for Better Navigation Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none text-slate-800 rounded-full z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none text-slate-800 rounded-full z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? "w-8 sm:w-10 md:w-12 h-2 sm:h-2.5 bg-white shadow-lg" 
                : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/75"
            } disabled:opacity-50`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TopSlider;