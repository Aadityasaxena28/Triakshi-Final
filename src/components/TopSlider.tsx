import heroImage from "@/assets/hero-gemstones.jpg";
import slideImage2 from "@/assets/Slide2.jpg";
import slideImage3 from "@/assets/slide3.jpg";
import slideImage4 from "@/assets/slide4.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import freead from "@/assets/freead.jpeg";
import newad from "@/assets/newadd.png";
import jadebanner from "@/assets/banner_jade_website.jpg";
import pyritebanner from "@/assets/pyrite_bracelet_banner.png";
import yantra_ban from "@/assets/yantra_banner.png";
import moonga_combo from "@/assets/Moonga_combo.png";
import mobfirst from "@/assets/2.png";
import lapfirst from "@/assets/poster_laptop.jpeg";
import lapsec from "@/assets/banner2.png";
import bannermo from"@/assets/bannermob.jpeg";

const TopSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = [
    {
      id: 0,
      type: "promo",
      image: lapfirst,
      mobileImage: mobfirst, // You can use different image for mobile
      bgColor: "#d9853b",
      link: "https://triakshi.co.in/rudra-view/692b703a09e2057af820b27f",
    },
    {
      id: 1,
      type: "hero",
      image: heroImage,
      mobileImage: heroImage, // You can use different image for mobile
      bgColor: "from-black/40 to-black/30",
      title: "Gemstone",
      subtitle: "Collection",
      description:
        "Discover the mystical power of premium gemstones, carefully curated for healing, prosperity, and spiritual growth.",
    },
    {
      id: 2,
      type: "image-only",
      image: lapsec,
      mobileImage: bannermo,
      bgColor: "#3b1f0f",
    },
    {
      id: 3,
      type: "image-only",
      image: slideImage3,
      mobileImage: slideImage3, // You can use different image for mobile
      bgColor: "#3b1f0f",
    },
    {/*
      id: 4,
      type: "image-only",
      image: slideImage4,
      mobileImage: slideImage4,
      bgColor: "#0a1448",*/
    },
     {
      id: 5,
      type: "image-only",
      image: jadebanner,
      mobileImage: jadebanner, // You can use different image for mobile
      bgColor: "#d9853b",
    },
    {
      id: 6,
      type: "image-only",
      image: pyritebanner,
      mobileImage: pyritebanner, // You can use different image for mobile
      bgColor: "#d9853b",
    },
    {
      id: 7,
      type: "image-only",
      image: yantra_ban,
      mobileImage: yantra_ban, // You can use different image for mobile
      bgColor: "#d9853b",
    },
    {
      id: 8,
      type: "image-only",
      image: moonga_combo,
      mobileImage: moonga_combo, // You can use different image for mobile
      bgColor: "#d9853b",
    },

  ];

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  }, [isTransitioning, slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!isTransitioning && index !== currentSlide) {
        setIsTransitioning(true);
        setCurrentSlide(index);
        setTimeout(() => setIsTransitioning(false), 800);
      }
    },
    [isTransitioning, currentSlide]
  );

  useEffect(() => {
    const timer = setInterval(nextSlide, 2000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handlePromoClick = () => {
    window.open("https://triakshi.co.in/rudra-view/692b703a09e2057af820b27f", "_blank");
  };

  // Helper function to get the correct image based on device
  const getSlideImage = (slide) => {
    return isMobile && slide.mobileImage ? slide.mobileImage : slide.image;
  };

  return (
    <section className="relative h-[50vh] sm:h-[53vh] md:h-[60vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Ambient background glow - Different for mobile vs desktop */}
      <div className={`absolute inset-0 pointer-events-none ${
        isMobile 
          ? 'bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-50 animate-pulse-ambient-mobile' 
          : 'bg-gradient-radial from-amber-500/5 via-transparent to-transparent opacity-60 animate-pulse-ambient'
      }`} />
      
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 ${
              isMobile 
                ? 'transition-all duration-[600ms]' 
                : 'transition-all duration-[800ms]'
            } ${
              index === currentSlide
                ? isMobile 
                  ? "opacity-100 scale-100 z-10 animate-slide-in-mobile" 
                  : "opacity-100 scale-100 z-10 animate-slide-in"
                : index === (currentSlide - 1 + slides.length) % slides.length
                ? "opacity-0 scale-95 blur-sm z-0"
                : "opacity-0 scale-105 blur-sm z-0"
            }`}
          >
            {/* Promo Slide (Free Ad) */}
            {slide.type === "promo" ? (
              <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: slide.bgColor }}
              >
                {/* Animated gradient overlay - Different for mobile */}
                <div className={`absolute inset-0 ${
                  isMobile
                    ? 'bg-gradient-to-b from-purple-600/15 via-transparent to-purple-900/15 animate-gradient-shift-mobile'
                    : 'bg-gradient-to-br from-amber-600/20 via-transparent to-amber-900/20 animate-gradient-shift'
                }`} />
                
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={getSlideImage(slide)}
                    alt="Free Rudraksha Offer"
                    className={`max-w-full max-h-full object-contain transform transition-transform duration-500 ${
                      isMobile ? 'hover:scale-[1.01]' : 'hover:scale-[1.02]'
                    }`}
                  />
                  
                  {/* Interactive Button Overlay */}
                  <div className="absolute inset-0 flex items-end justify-end pb-1 pr-2 sm:pr-3 md:pr-4">
                    <Button
                      onClick={handlePromoClick}
                      className={`relative group bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-3.5 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-amber-500/50 border-2 border-white/30 backdrop-blur-sm ${
                        isMobile ? 'animate-bounce-subtle-mobile' : 'animate-bounce-subtle'
                      }`}
                    >
                      <Sparkles className="inline-block w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 animate-spin-slow" />
                      Get Free Rudraksha Now
                      <Sparkles className="inline-block w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ml-1.5 animate-spin-slow" />
                      
                      {/* Pulsing Ring Effect */}
                      <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping"></span>
                      
                      {/* Shimmer Effect */}
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-button"></span>
                    </Button>
                  </div>

                  {/* Enhanced Floating particles - More on desktop, fewer on mobile */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="promo-particle promo-particle-1"></div>
                    <div className="promo-particle promo-particle-2"></div>
                    <div className="promo-particle promo-particle-3"></div>
                    <div className="promo-particle promo-particle-4"></div>
                    {!isMobile && (
                      <>
                        <div className="promo-particle promo-particle-5"></div>
                        <div className="promo-particle promo-particle-6"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : slide.type === "hero" ? (
              <>
                {/* Background Image with parallax effect - Different image for mobile */}
                <div
                  className={`absolute inset-0 bg-cover bg-center ${
                    isMobile ? 'animate-ken-burns-mobile' : 'animate-ken-burns'
                  }`}
                  style={{ backgroundImage: `url(${getSlideImage(slide)})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} backdrop-blur-[0.5px]`} />
                  
                  {/* Elegant vignette - Stronger on mobile */}
                  <div className={`absolute inset-0 ${
                    isMobile 
                      ? 'bg-gradient-radial from-transparent via-transparent to-black/70'
                      : 'bg-gradient-radial from-transparent via-transparent to-black/60'
                  }`} />
                </div>

                {/* Enhanced Floating Particles - Fewer on mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                  <div className="particle particle-4"></div>
                  {!isMobile && (
                    <>
                      <div className="particle particle-5"></div>
                      <div className="particle particle-6"></div>
                      <div className="particle particle-7"></div>
                      <div className="particle particle-8"></div>
                    </>
                  )}
                </div>

                {/* Hero Content with enhanced animations */}
                <div className="relative z-10 h-full flex items-center justify-center px-3 sm:px-4 md:px-6">
                  <div className={`text-center space-y-2 sm:space-y-3 md:space-y-4 max-w-3xl ${
                    isMobile ? 'animate-fade-in-up-mobile' : 'animate-fade-in-up'
                  }`}>
                    {/* Decorative top element */}
                    <div className="flex justify-center mb-3 animate-fade-in">
                      <div className={`h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full ${
                        isMobile ? 'w-12' : 'w-16'
                      }`}></div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <h1 className="text-[2.6rem] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.2rem] font-bold text-white leading-none tracking-tight drop-shadow-2xl animate-slide-up filter drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                        {slide.title}
                      </h1>
                      <h2 className="text-[2.6rem] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.2rem] font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent leading-none tracking-tight animate-shimmer animate-slide-up-delay filter drop-shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                        {slide.subtitle}
                      </h2>
                    </div>

                    <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-xl mx-auto leading-relaxed font-light drop-shadow-lg animate-fade-in-delay backdrop-blur-sm bg-black/10 rounded-lg ${
                      isMobile ? 'px-3 py-1.5' : 'px-4 py-2'
                    }`}>
                      {slide.description}
                    </p>

                    {/* Enhanced Decorative Lines */}
                    <div className="flex justify-center gap-1.5 sm:gap-2 pt-2 sm:pt-3 animate-fade-in-delay-2">
                      <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full animate-pulse-glow" />
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse-slow shadow-lg shadow-amber-400/50" />
                      <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full animate-pulse-glow" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Image-Only Slides with elegant presentation - Different image for mobile
              <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: slide.bgColor }}
              >
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
                
                <img
                  src={getSlideImage(slide)}
                  alt={`Slide ${slide.id}`}
                  className={`max-w-full max-h-full object-contain transform transition-transform duration-700 filter drop-shadow-2xl ${
                    isMobile ? 'hover:scale-[1.01]' : 'hover:scale-[1.02]'
                  }`}
                />
                
                {/* Corner accent - Different sizes for mobile */}
                <div className={`absolute top-0 left-0 bg-gradient-to-br from-amber-500/10 to-transparent blur-xl ${
                  isMobile ? 'w-16 h-16' : 'w-20 h-20'
                }`} />
                <div className={`absolute bottom-0 right-0 bg-gradient-to-tl from-amber-500/10 to-transparent blur-xl ${
                  isMobile ? 'w-16 h-16' : 'w-20 h-20'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-1.5 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white border-none text-slate-800 rounded-full z-30 w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 backdrop-blur-md hover:shadow-amber-500/20"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-1.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white border-none text-slate-800 rounded-full z-30 w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 backdrop-blur-md hover:shadow-amber-500/20"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>

      {/* Enhanced Slide Indicators */}
      <div className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-30 bg-black/20 backdrop-blur-md rounded-full ${
        isMobile ? 'px-2 py-1.5' : 'px-3 py-2'
      }`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? "w-6 sm:w-8 md:w-10 h-1.5 sm:h-2 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-lg shadow-amber-500/50"
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 hover:bg-white/90 hover:scale-110"
            } disabled:opacity-50`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes shimmer-button {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer-button {
          animation: shimmer-button 2s ease-in-out infinite;
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2.5s ease-in-out infinite;
        }
        
        @keyframes bounce-subtle-mobile {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-subtle-mobile {
          animation: bounce-subtle-mobile 2s ease-in-out infinite;
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out;
        }
        
        @keyframes fade-in-up-mobile {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up-mobile {
          animation: fade-in-up-mobile 0.9s ease-out;
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        .animate-slide-up-delay {
          animation: slide-up 1s ease-out 0.5s both;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.7s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.9s both;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes ken-burns {
          0% {
            transform: scale(1) translateX(0);
          }
          50% {
            transform: scale(1.08) translateX(-2%);
          }
          100% {
            transform: scale(1) translateX(0);
          }
        }
        .animate-ken-burns {
          animation: ken-burns 25s ease-in-out infinite;
        }
        
        @keyframes ken-burns-mobile {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-ken-burns-mobile {
          animation: ken-burns-mobile 20s ease-in-out infinite;
        }
        
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }
        
        @keyframes slide-in-mobile {
          0% {
            opacity: 0;
            transform: scale(0.98) translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }
        .animate-slide-in-mobile {
          animation: slide-in-mobile 0.6s ease-out;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(0);
          }
          50% {
            opacity: 0.6;
            transform: translateX(10px);
          }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }
        
        @keyframes gradient-shift-mobile {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 0.5;
            transform: translateY(5px);
          }
        }
        .animate-gradient-shift-mobile {
          animation: gradient-shift-mobile 6s ease-in-out infinite;
        }
        
        @keyframes pulse-ambient {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-ambient {
          animation: pulse-ambient 6s ease-in-out infinite;
        }
        
        @keyframes pulse-ambient-mobile {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-ambient-mobile {
          animation: pulse-ambient-mobile 5s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.6;
          }
          33% {
            transform: translateY(-25px) translateX(15px) rotate(120deg);
            opacity: 1;
          }
          66% {
            transform: translateY(-15px) translateX(-10px) rotate(240deg);
            opacity: 0.8;
          }
        }
        
        .particle {
          position: absolute;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(251, 191, 36, 0.4) 40%,
            rgba(255, 255, 255, 0) 70%
          );
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }
        .particle-1 {
          width: 6px;
          height: 6px;
          top: 15%;
          left: 8%;
          animation: float 7s ease-in-out infinite;
        }
        .particle-2 {
          width: 8px;
          height: 8px;
          top: 55%;
          left: 85%;
          animation: float 9s ease-in-out infinite 1.2s;
        }
        .particle-3 {
          width: 5px;
          height: 5px;
          top: 35%;
          left: 25%;
          animation: float 8s ease-in-out infinite 2.5s;
        }
        .particle-4 {
          width: 7px;
          height: 7px;
          top: 75%;
          left: 65%;
          animation: float 10s ease-in-out infinite 1.8s;
        }
        .particle-5 {
          width: 6px;
          height: 6px;
          top: 25%;
          left: 92%;
          animation: float 8.5s ease-in-out infinite 0.7s;
        }
        .particle-6 {
          width: 4px;
          height: 4px;
          top: 65%;
          left: 15%;
          animation: float 7.5s ease-in-out infinite 3s;
        }
        .particle-7 {
          width: 5px;
          height: 5px;
          top: 45%;
          left: 50%;
          animation: float 9.5s ease-in-out infinite 1.5s;
        }
        .particle-8 {
          width: 7px;
          height: 7px;
          top: 85%;
          left: 40%;
          animation: float 8s ease-in-out infinite 2s;
        }
        
        .promo-particle {
          position: absolute;
          background: radial-gradient(
            circle,
            rgba(251, 191, 36, 1) 0%,
            rgba(251, 191, 36, 0.6) 30%,
            rgba(251, 191, 36, 0) 70%
          );
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
        }
        .promo-particle-1 {
          width: 8px;
          height: 8px;
          bottom: 15%;
          left: 35%;
          animation: float 4s ease-in-out infinite;
        }
        .promo-particle-2 {
          width: 6px;
          height: 6px;
          bottom: 20%;
          right: 35%;
          animation: float 5s ease-in-out infinite 1s;
        }
        .promo-particle-3 {
          width: 10px;
          height: 10px;
          bottom: 12%;
          left: 25%;
          animation: float 6s ease-in-out infinite 0.5s;
        }
        .promo-particle-4 {
          width: 7px;
          height: 7px;
          bottom: 18%;
          right: 25%;
          animation: float 5.5s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
};

export default TopSlider;