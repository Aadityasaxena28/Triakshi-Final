import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Users, Award, Gem, Heart } from "lucide-react";
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
    <section className="py-8 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-1.5 bg-orange-100 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3 border border-orange-200">
            <Sparkles className="h-3 w-3 text-orange-600" />
            <span className="text-orange-700 font-semibold tracking-wide text-xs">Customer Reviews</span>
            <Sparkles className="h-3 w-3 text-orange-600" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            1000+ Happy Customers
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from our satisfied gemstone buyers across India
          </p>
        </div>

        {/* Slider Controls */}
        <div className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 md:-left-4 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110 group border border-gray-200"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 group-hover:text-orange-600" />
          </button>

          {/* Testimonials Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth gap-3 px-2 py-3"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="min-w-[240px] md:min-w-[280px] max-w-[240px] md:max-w-[280px] flex-shrink-0 bg-white backdrop-blur-lg border border-gray-200 rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-500 hover:-translate-y-1 group"
                style={{ 
                  scrollSnapAlign: "start",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Quote Icon */}
                <div className="relative mb-3">
                  <Quote className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors duration-300" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-300"></div>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 leading-relaxed mb-4 text-xs min-h-[80px]">
                  "{testimonial.review}"
                </p>

                {/* Rating Stars */}
                <div className="flex items-center space-x-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-3 w-3 text-yellow-500 fill-current drop-shadow-sm" 
                      style={{
                        animation: `starPop 0.3s ease-out ${i * 0.1}s both`
                      }}
                    />
                  ))}
                </div>

                {/* Customer Info */}
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-xs mb-0.5">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 flex items-center">
                    <span className="inline-block w-1 h-1 bg-orange-500 rounded-full mr-1.5"></span>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 md:-right-4 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110 group border border-gray-200"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-orange-600" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: "1000+", label: "Happy Customers", icon: Users, color: "text-blue-600" },
            { value: "25+", label: "Years Experience", icon: Award, color: "text-purple-600" },
            { value: "500+", label: "SKU's", icon: Gem, color: "text-emerald-600" },
            { value: "99%", label: "Retention Rate", icon: Heart, color: "text-rose-600" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300 bg-white rounded-lg p-3 shadow-sm border border-gray-100"
              >
                <Icon className={`h-6 w-6 mx-auto mb-1.5 ${stat.color}`} />
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
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