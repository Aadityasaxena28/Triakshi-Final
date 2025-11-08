import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useRef } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      review:
        "The blue sapphire I purchased has brought incredible clarity to my life. The quality is exceptional and the energy is truly transformative.",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 5,
      review:
        "Amazing collection of rudraksha beads! The spiritual energy and authenticity is unmatched. Highly recommend for anyone on a spiritual journey.",
    },
    {
      id: 3,
      name: "Anitha Reddy",
      location: "Bangalore, India",
      rating: 5,
      review:
        "The health calculator feature helped me choose the perfect gemstone. My stress levels have reduced significantly since wearing the recommended stone.",
    },
    {
      id: 4,
      name: "Manoj Patel",
      location: "Ahmedabad, India",
      rating: 5,
      review:
        "Excellent customer service and authentic products. The lucky charms I bought have definitely improved my business prospects!",
    },
    {
      id: 5,
      name: "Neha Verma",
      location: "Jaipur, India",
      rating: 5,
      review:
        "The gemstone consultation was spot-on! The energy of the stone has brought peace and prosperity into my life.",
    },
    {
      id: 6,
      name: "Amit Singh",
      location: "Lucknow, India",
      rating: 5,
      review:
        "The delivery was quick and the gemstone came with proper certification. Great experience overall!",
    },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount =
      direction === "left" ? -scrollRef.current.offsetWidth : scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-yellow-400/30">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-yellow-100 font-semibold tracking-wide">Customer Reviews</span>
            <Sparkles className="h-5 w-5 text-yellow-300" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
           1000+ Happy Customers
          </h2>
          <p className="text-xl text-amber-100/80 max-w-3xl mx-auto leading-relaxed">
            Real experiences from our satisfied gemstone buyers across India
          </p>
        </div>

        {/* Slider Controls */}
        <div className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-12 z-10 bg-white/90 hover:bg-white shadow-2xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-amber-900 group-hover:text-amber-700" />
          </button>

          {/* Testimonials Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth gap-6 px-2 py-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="min-w-[320px] md:min-w-[360px] max-w-[320px] md:max-w-[360px] flex-shrink-0 bg-white/95 backdrop-blur-lg border-2 border-yellow-400/30 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-500/20 hover:border-yellow-400/60 transition-all duration-500 hover:-translate-y-2 group"
                style={{ 
                  scrollSnapAlign: "start",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Quote Icon */}
                <div className="relative mb-4">
                  <Quote className="h-10 w-10 text-amber-400/40 group-hover:text-amber-500/60 transition-colors duration-300" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-300"></div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base min-h-[120px]">
                  "{testimonial.review}"
                </p>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-yellow-500 fill-current drop-shadow-sm" 
                      style={{
                        animation: `starPop 0.3s ease-out ${i * 0.1}s both`
                      }}
                    />
                  ))}
                </div>

                {/* Customer Info */}
                <div className="pt-4 border-t border-amber-200">
                  <h4 className="font-bold text-amber-900 text-base mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-amber-700/70 flex items-center">
                    <span className="inline-block w-1 h-1 bg-amber-600 rounded-full mr-2"></span>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-12 z-10 bg-white/90 hover:bg-white shadow-2xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-amber-900 group-hover:text-amber-700" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { value: "10K+", label: "Happy Customers", icon: "👥" },
            { value: "25+", label: "Years Experience", icon: "⭐" },
            { value: "500+", label: "Gem Varieties", icon: "💎" },
            { value: "99%", label: "Satisfaction Rate", icon: "❤️" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-110 transition-transform duration-300"
            >
              <div className="text-5xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-amber-100/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes starPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;