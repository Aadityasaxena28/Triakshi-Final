import { HelpCircle, ChevronDown, Sparkles, Shield, Truck, FileText, Star } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      icon: <Shield className="h-6 w-6" />,
      question: "What makes Triakshi Gems' gemstones authentic and high-quality?",
      answer: "Triakshi Gems provides 100% natural, lab-certified gemstones that follow strict quality checks for clarity, color, cut, and purity, ensuring customers receive powerful and effective stones."
    },
    {
      id: 2,
      icon: <Star className="h-6 w-6" />,
      question: "How do I choose the right gemstone for life, health, or luck?",
      answer: "Our experts analyze your kundli, birth details, and planetary positions to suggest the ideal life stone, health stone, lucky stone, and other remedies that align with your astrological needs."
    },
    {
      id: 3,
      icon: <Sparkles className="h-6 w-6" />,
      question: "What are the benefits of wearing certified Rudraksha, Yantra, or gemstone bracelets?",
      answer: "Wearing certified Rudraksha beads, Yantras, or gemstone bracelets helps enhance positivity, reduce stress, attract prosperity, and bring mental clarity, depending on the type and purpose."
    },
    {
      id: 4,
      icon: <FileText className="h-6 w-6" />,
      question: "Does Triakshi Gems provide gemstone reports and astrology consultation?",
      answer: "Yes. We offer detailed gemstone reports that include your life stone, health stone, lucky stone, along with personalized astrological insights and remedies for better life outcomes."
    },
    {
      id: 5,
      icon: <Truck className="h-6 w-6" />,
      question: "How fast does Triakshi Gems deliver products like gemstones, malas, incense, and Yantras?",
      answer: "We provide quick and secure shipping across India, ensuring safe delivery of gemstones, Rudraksha malas, bracelets, incense items, and Yantras with proper packaging and certification."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-yellow-400/30">
            <HelpCircle className="h-5 w-5 text-yellow-300" />
            <span className="text-yellow-100 font-semibold tracking-wide">Have Questions?</span>
            <HelpCircle className="h-5 w-5 text-yellow-300" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-amber-100/80 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our authentic gemstones and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white/95 backdrop-blur-lg border-2 border-yellow-400/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-500/20 transition-all duration-500 hover:border-yellow-400/60"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left group hover:bg-amber-50/50 transition-colors duration-300"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-amber-100 text-amber-700 group-hover:bg-amber-200'
                  }`}>
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className={`flex-shrink-0 ml-4 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <ChevronDown className={`h-6 w-6 transition-colors duration-300 ${
                    openIndex === index ? 'text-amber-600' : 'text-amber-400 group-hover:text-amber-600'
                  }`} />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pl-20">
                  <div className="pt-4 border-t border-amber-200/50">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white/10 backdrop-blur-lg border-2 border-yellow-400/30 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-amber-100/80 text-lg mb-6 max-w-2xl mx-auto">
            Our gemstone experts are here to guide you. Reach out for personalized consultation and astrological insights.
          </p>
          <div className="flex justify-center">
            <a 
              href="https://astroashoknarayan.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/50 flex items-center space-x-2"
            >
              <span>Contact Our Experts</span>
              <Sparkles className="h-5 w-5" />
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