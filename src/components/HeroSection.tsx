import React from 'react';
import nban from "@/assets/newban.jpeg";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${nban})` }}
      >
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl space-y-6 animate-fadeIn">
          {/* Decorative Element */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-amber-400 to-transparent"></div>
            <span className="text-amber-400 font-light tracking-[0.3em] text-sm uppercase">
              Spiritual Elegance
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight tracking-tight">
            Discover the Power of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 mt-2">
              Sacred Gemstones
            </span>
          </h1>

          {/* Body Text */}
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl font-light">
            Embrace ancient wisdom with our curated collection of premium gemstones, 
            Rudraksha beads, and spiritual accessories. Each piece is carefully selected 
            to enhance your spiritual journey and bring harmony to your life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium tracking-wide overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button className="px-8 py-4 border-2 border-white/30 text-white font-medium tracking-wide backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 pt-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <span className="text-sm font-light">Authentic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <span className="text-sm font-light">Certified Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <span className="text-sm font-light">Spiritual Guidance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;