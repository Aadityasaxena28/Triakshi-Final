import { HelpCircle, ChevronDown, Sparkles, Shield, Truck, FileText, Star } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      icon: <Shield className="h-4 w-4" />,
      question: "What makes Triakshi Gems' gemstones authentic and high-quality?",
      answer: "Triakshi Gems provides 100% natural, lab-certified gemstones that follow strict quality checks for clarity, color, cut, and purity, ensuring customers receive powerful and effective stones."
    },
    {
      id: 2,
      icon: <Star className="h-4 w-4" />,
      question: "How do I choose the right gemstone for life, health, or luck?",
      answer: "Our experts analyze your kundli, birth details, and planetary positions to suggest the ideal life stone, health stone, lucky stone, and other remedies that align with your astrological needs."
    },
    {
      id: 3,
      icon: <Sparkles className="h-4 w-4" />,
      question: "What are the benefits of wearing certified Rudraksha, Yantra, or gemstone bracelets?",
      answer: "Wearing certified Rudraksha beads, Yantras, or gemstone bracelets helps enhance positivity, reduce stress, attract prosperity, and bring mental clarity, depending on the type and purpose."
    },
    {
      id: 4,
      icon: <FileText className="h-4 w-4" />,
      question: "Does Triakshi Gems provide gemstone reports and astrology consultation?",
      answer: "Yes. We offer detailed gemstone reports that include your life stone, health stone, lucky stone, along with personalized astrological insights and remedies for better life outcomes."
    },
    {
      id: 5,
      icon: <Truck className="h-4 w-4" />,
      question: "How fast does Triakshi Gems deliver products like gemstones, malas, incense, and Yantras?",
      answer: "We provide quick and secure shipping across India, ensuring safe delivery of gemstones, Rudraksha malas, bracelets, incense items, and Yantras with proper packaging and certification."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-1.5 bg-orange-50 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3 border border-orange-200">
            <HelpCircle className="h-3 w-3 text-orange-600" />
            <span className="text-orange-700 font-semibold tracking-wide text-xs">Have Questions?</span>
            <HelpCircle className="h-3 w-3 text-orange-600" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our authentic gemstones and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white backdrop-blur-lg border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-300"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 text-left group hover:bg-orange-50/30 transition-colors duration-300"
              >
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                  }`}>
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-orange-700 transition-colors duration-300 pr-3 leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className={`flex-shrink-0 ml-3 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <ChevronDown className={`h-4 w-4 transition-colors duration-300 ${
                    openIndex === index ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-600'
                  }`} />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4 pl-12">
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center bg-gradient-to-br from-orange-50 to-amber-50 backdrop-blur-lg border border-orange-200 rounded-xl p-6 md:p-8 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mb-4 max-w-2xl mx-auto">
            Our gemstone experts are here to guide you. Reach out for personalized consultation and astrological insights.
          </p>
          <div className="flex justify-center">
            <a 
              href="www.astroashoknarayan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2 text-sm"
            >
              <span>Contact Our Experts</span>
              <Sparkles className="h-3.5 w-3.5" />
            </a>
          </div>
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
      `}</style>
    </section>
  );
};

export default FAQSection;