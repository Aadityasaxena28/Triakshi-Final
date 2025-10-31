import { ChevronDown, Package, Truck, Mail, Phone, Clock, MapPin, Shield } from 'lucide-react';
import { useState } from 'react';

export default function ShippingPolicy() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      id: 1,
      icon: "📦",
      title: "Our Commitment",
      color: "from-yellow-400/20 to-orange-500/10",
      description: "We strive to deliver products purchased in excellent condition and in the fastest time possible. Every order is handled with care to ensure your gemstones and products reach you safely."
    },
    {
      id: 2,
      icon: "💰",
      title: "Shipping Charges",
      color: "from-orange-400/20 to-red-500/10",
      description: "There is a shipping charge of Rs 300/- on prepaid orders within India. This ensures your precious items are delivered safely and securely to your doorstep.",
      note: "All prices are inclusive of GST."
    },
    {
      id: 3,
      icon: "📮",
      title: "Packaging Standards",
      color: "from-red-400/20 to-orange-500/10",
      description: "All items are packed in box packing and are dispatched in best conditions. We use premium packaging materials to protect your gemstones during transit."
    },
    {
      id: 4,
      icon: "🚚",
      title: "Delivery Partners",
      color: "from-orange-400/20 to-yellow-500/10",
      description: "We partnered with the best in the industry to ensure proper deliveries namely DHL, FedEx, BlueDart. To promote #AtmaNirbharBharat we try to partner with India Post wherever possible.",
      partners: ["DHL", "FedEx", "BlueDart", "India Post"]
    },
    {
      id: 5,
      icon: "⏰",
      title: "Delivery Timeline",
      color: "from-yellow-400/20 to-orange-500/10",
      description: "Delivery Time: 7 to 12 working days. Excluding Sundays and local holidays.",
      note: "Actual shipping time may vary with type (domestic or international) and location. The company 'Life Is Divine' won't be liable for any delays or damages during transit."
    },
    {
      id: 6,
      icon: "🌍",
      title: "International Shipping",
      color: "from-orange-400/20 to-red-500/10",
      description: "Shipping charges will be added automatically on all international orders. If there is any confusion regarding the rates charged for international shipping please feel free to reach out to our customer service team.",
      customInfo: {
        title: "Custom Duties & Taxes",
        content: "In case of international shipments, Custom Duties and/or local taxes are to be borne by the customer. We take all essential measures to ensure a smooth delivery but custom clearance, if the need arises, is the customer's responsibility."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-300 rounded-full opacity-5 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-12 px-6">
          <div className="flex justify-center mb-6 animate-bounce">
            <Truck className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-4">
            Shipping Policy
          </h1>
          <p className="text-xl text-amber-100 font-semibold">Fast, Safe & Secure Delivery</p>
        </div>

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Package className="w-8 h-8 text-yellow-300" />
              <h2 className="text-2xl font-bold text-yellow-300">Welcome to Triakshi Gems</h2>
            </div>
            <p className="text-amber-50 text-lg leading-relaxed text-center">
              Your satisfaction is our priority. We ensure every product reaches you in perfect condition through our trusted delivery partners.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="max-w-4xl mx-auto px-6 mb-16 space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`group relative transform transition-all duration-700 opacity-100 translate-y-0`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${section.color} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>

              <div className="relative bg-gradient-to-br from-amber-800/60 to-orange-800/40 backdrop-blur-sm border-2 border-yellow-400/40 rounded-xl shadow-2xl group-hover:border-yellow-300/70 transition-all duration-300">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-yellow-400/5 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl drop-shadow-lg">{section.icon}</span>
                    <h2 className="text-2xl font-bold text-yellow-300 text-left">{section.title}</h2>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-orange-300 transition-transform duration-300 ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expandable Content */}
                {expandedSections[section.id] && (
                  <div className="px-8 pb-6 border-t border-yellow-400/20 space-y-6 animate-fadeIn">
                    {/* Main Description */}
                    <p className="text-amber-100 leading-relaxed text-lg">{section.description}</p>

                    {/* Partners List */}
                    {section.partners && (
                      <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6">
                        <h3 className="text-orange-200 font-bold mb-4 text-lg">Our Trusted Partners:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {section.partners.map((partner, i) => (
                            <div key={i} className="bg-gradient-to-br from-amber-900/60 to-orange-900/40 rounded-lg p-4 text-center border border-yellow-400/20">
                              <span className="text-yellow-300 font-bold text-lg">{partner}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom Info Box */}
                    {section.customInfo && (
                      <div className="bg-red-900/30 border-2 border-orange-400/40 rounded-lg p-6">
                        <h3 className="text-orange-200 font-bold mb-3 text-xl flex items-center gap-2">
                          <Shield className="w-5 h-5 text-yellow-300" />
                          {section.customInfo.title}
                        </h3>
                        <p className="text-amber-100 leading-relaxed">{section.customInfo.content}</p>
                      </div>
                    )}

                    {/* Note */}
                    {section.note && (
                      <p className="text-amber-50 italic bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                        <span className="font-bold text-yellow-300">Note:</span> {section.note}
                      </p>
                    )}
                  </div>
                )}

                {/* Decorative Stars */}
                <div className="absolute top-3 right-3 text-yellow-400 opacity-30 text-xl">✦</div>
                <div className="absolute bottom-3 left-3 text-orange-300 opacity-20 text-lg">✦</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-300 mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-4xl">📞</span>
              Need Help with Shipping?
            </h2>
            <p className="text-amber-100 text-center text-lg mb-8">
              If you have any questions or confusion regarding shipping rates, please feel free to reach out to our customer service team:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email */}
              <div className="bg-gradient-to-br from-orange-900/50 to-red-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold text-yellow-300">Email</h3>
                </div>
                <a
                  href="mailto:acharyaashoknarayann@gmail.com"
                  className="text-amber-50 hover:text-yellow-200 transition-colors text-lg break-all"
                >
                  acharyaashoknarayann@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-red-900/50 to-orange-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold text-yellow-300">Phone</h3>
                </div>
                <a
                  href="tel:+918130268434"
                  className="text-amber-50 hover:text-yellow-200 transition-colors text-lg"
                >
                  +91 8130268434
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Happy Shopping Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-yellow-400/30 via-orange-400/20 to-red-400/30 backdrop-blur-sm border-4 border-yellow-400/60 rounded-3xl p-12 shadow-2xl text-center">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-4xl font-black text-yellow-200 mb-4">Happy Shopping!</h2>
            <p className="text-amber-100 text-xl">
              Thank you for choosing Triakshi Gems. We look forward to serving you!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-12 border-t border-yellow-400/30">
          <div className="flex justify-center gap-3 mb-6">
            <Package className="w-6 h-6 text-yellow-300 animate-bounce" />
            <Truck className="w-6 h-6 text-orange-300 animate-bounce delay-100" />
            <Package className="w-6 h-6 text-yellow-300 animate-bounce delay-200" />
          </div>
          <p className="text-amber-200 text-sm mb-2">
            © Triakshi by Ashok Narayann Guruji • Safe & Secure Shipping
          </p>
          <p className="text-amber-300 text-xs">
            Last Updated: November 2025
          </p>
        </div>
      </div>
    </div>
  );
}