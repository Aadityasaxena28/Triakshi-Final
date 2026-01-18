import {
  ChevronDown,
  Package,
  Truck,
  Mail,
  Phone,
  Clock,
  MapPin,
  Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ShippingPolicy() {
  const [expandedSections, setExpandedSections] = useState({});

  // 🔼 SCROLL TO TOP WHEN THIS ROUTE LOADS
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

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
      description:
        "We strive to deliver products purchased in excellent condition and in the fastest time possible. Every order is handled with care to ensure your gemstones and products reach you safely."
    },
    {
      id: 2,
      icon: "💰",
      title: "Shipping Charges",
      color: "from-orange-400/20 to-red-500/10",
      description:
        "There is a shipping charge of Rs 300/- on prepaid orders within India. This ensures your precious items are delivered safely and securely to your doorstep.",
      note: "All prices are inclusive of GST."
    },
    {
      id: 3,
      icon: "📮",
      title: "Packaging Standards",
      color: "from-red-400/20 to-orange-500/10",
      description:
        "All items are packed in box packing and are dispatched in best conditions. We use premium packaging materials to protect your gemstones during transit."
    },
    {
      id: 4,
      icon: "🚚",
      title: "Delivery Partners",
      color: "from-orange-400/20 to-yellow-500/10",
      description:
        "We partnered with the best in the industry to ensure proper deliveries namely DHL, FedEx, BlueDart. To promote #AtmaNirbharBharat we try to partner with India Post wherever possible.",
      partners: ["DHL", "FedEx", "BlueDart", "India Post"]
    },
    {
      id: 5,
      icon: "⏰",
      title: "Delivery Timeline",
      color: "from-yellow-400/20 to-orange-500/10",
      description:
        "Delivery Time: 7 to 12 working days. Excluding Sundays and local holidays.",
      note:
        "Actual shipping time may vary with type (domestic or international) and location. The company 'Life Is Divine' won't be liable for any delays or damages during transit."
    },
    {
      id: 6,
      icon: "🌍",
      title: "International Shipping",
      color: "from-orange-400/20 to-red-500/10",
      description:
        "Shipping charges will be added automatically on all international orders. If there is any confusion regarding the rates charged for international shipping please feel free to reach out to our customer service team.",
      customInfo: {
        title: "Custom Duties & Taxes",
        content:
          "In case of international shipments, Custom Duties and/or local taxes are to be borne by the customer. We take all essential measures to ensure a smooth delivery but custom clearance, if the need arises, is the customer's responsibility."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
      {/* Animated Background */}
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
          <p className="text-xl text-amber-100 font-semibold">
            Fast, Safe & Secure Delivery
          </p>
        </div>

        {/* Welcome */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Package className="w-8 h-8 text-yellow-300" />
              <h2 className="text-2xl font-bold text-yellow-300">
                Welcome to Triakshi Gems
              </h2>
            </div>
            <p className="text-amber-50 text-lg leading-relaxed text-center">
              Your satisfaction is our priority. We ensure every product reaches
              you in perfect condition through our trusted delivery partners.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto px-6 mb-16 space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="group relative transform transition-all duration-700 opacity-100 translate-y-0"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.color} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`}
              />

              <div className="relative bg-gradient-to-br from-amber-800/60 to-orange-800/40 backdrop-blur-sm border-2 border-yellow-400/40 rounded-xl shadow-2xl">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-8 py-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{section.icon}</span>
                    <h2 className="text-2xl font-bold text-yellow-300 text-left">
                      {section.title}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-orange-300 transition-transform ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSections[section.id] && (
                  <div className="px-8 pb-6 border-t border-yellow-400/20 space-y-6 animate-fadeIn">
                    <p className="text-amber-100 text-lg">
                      {section.description}
                    </p>

                    {section.partners && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {section.partners.map((p, i) => (
                          <div key={i} className="text-center text-yellow-300">
                            {p}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.customInfo && (
                      <div className="border border-orange-400/40 rounded-lg p-6">
                        <h3 className="flex items-center gap-2 text-orange-200 font-bold">
                          <Shield className="w-5 h-5" />
                          {section.customInfo.title}
                        </h3>
                        <p className="text-amber-100">
                          {section.customInfo.content}
                        </p>
                      </div>
                    )}

                    {section.note && (
                      <p className="italic text-amber-50">
                        <b>Note:</b> {section.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
