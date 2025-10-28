import heroImage from "@/assets/hero-gemstones.jpg";
import slideImage2 from "@/assets/Slide2.jpg";
import slideImage3 from "@/assets/slide3.jpg";
import slideImage4 from "@/assets/slide4.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TopSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<number | null>(null);

  const slides = [
    { id: 1, type: "hero", image: heroImage, bgColor: "from-black/80 to-black/60" },
    { id: 2, type: "image-only", image: slideImage2 },
    { id: 3, type: "image-only", image: slideImage3 },
    { id: 4, type: "image-only", image: slideImage4 },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // run a single interval (avoid recreating on each tick)
  useEffect(() => {
    timerRef.current = window.setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="relative h-[60vh] sm:h-[65vh] overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background for slide 1 (cover with gradient) */}
            {slide.id === 1 ? (
              <>
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`} />

                {/* Buttons */}
                <div className="absolute top-16 left-8 right-8 z-20 flex justify-between items-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                    <Sparkles className="mr-2 h-5 w-5" /> Trial Now
                  </Button>
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 rounded-xl">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Buy Now
                  </Button>
                </div>

                {/* Hero Text */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center h-full pt-20 md:pt-28">
                  <div className="space-y-6 md:space-y-8">
                    <h1 className="text-[2.8rem] sm:text-[3.5rem] md:text-[5rem] font-bold text-white leading-tight">
                      Gemstone <span className="block text-gold">Collection</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                      Discover the mystical power of premium gemstones, carefully curated for healing,
                      prosperity, and spiritual growth.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // Slides 2/3/4: full-bleed image, no padding/background, cover the box
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="absolute inset-0 w-full h-full object-cover block select-none"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 hover:bg-white/30 text-white rounded-full z-20"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 hover:bg-white/30 text-white rounded-full z-20"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              i === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TopSlider;
