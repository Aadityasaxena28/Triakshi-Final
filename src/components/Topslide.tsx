import React from 'react';
import { Link } from 'react-router-dom';
import freefivemukhibanner from "@/assets/freefivemukhibanner.png";

const Topslide: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${freefivemukhibanner})` }}
      >
        {/* Gradient Overlay for better text readability - darker on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 md:from-black/70 md:via-black/50 md:to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
        <div className="max-w-3xl space-y-4 md:space-y-6 animate-fadeIn w-full">
          {/* Decorative Element */}
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
            <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-amber-400 to-transparent"></div>
            <span className="text-amber-400 font-light tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase">
              Spiritual Elegance
            </span>
          </div>

          {/* Main Heading - Responsive sizing with center alignment */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight tracking-tight text-center">
            Free
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 mt-1 md:mt-2">
              5 Mukhi Rudraksha
            </span>
          </h1>

          {/* Body Text - Better line height and spacing for mobile */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl font-light">
            It promote mental peace, emotional balance, and stress relief —making it one of the most powerful and widely worn Rudraksha beads.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center pt-2 md:pt-4">
            <Link 
              to="/rudra-view/692b703a09e2057af820b27f"
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium tracking-wide overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 inline-block text-center"
            >
              <span className="relative z-10">Get FREE Rudraksha</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>

          {/* Trust Indicators - Stack on mobile, horizontal on larger screens */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 md:gap-8 pt-3 md:pt-4 text-white/80 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <span className="text-xs md:text-sm font-light">Authentic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <span className="text-xs md:text-sm font-light">Certified Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <span className="text-xs md:text-sm font-light">Energized Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Scroll Indicator - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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

export default Topslide;