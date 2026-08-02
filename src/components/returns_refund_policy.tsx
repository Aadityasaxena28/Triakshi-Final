import {
  ChevronDown,
  ShieldAlert,
  Mail,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ReturnsRefundPolicy() {
  const [expandedSections, setExpandedSections] = useState({});

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
      icon: "🚫",
      title: "No Return & Refund Policy",
      color: "from-yellow-400/20 to-orange-500/10",
      description:
        "We currently do not accept returns or exchanges once an order has been delivered. Each product at triakshi.co.in is specially curated, quality-checked, and securely packed, ensuring you receive exactly what you ordered.",
      warning: "No returns or exchanges are accepted once an order has been delivered."
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
            <ShieldAlert className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-4">
            Returns & Refund Policy
          </h1>
          <p className="text-xl text-amber-100 font-semibold">
            Quality Assurance & Customer Care
          </p>
        </div>

        {/* Welcome Message */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-yellow-300" />
              <h2 className="text-2xl font-bold text-yellow-300">
                Our Commitment to Quality
              </h2>
            </div>
            <p className="text-amber-50 text-lg leading-relaxed text-center mb-4">
              At triakshi.co.in, we deeply value our customers and strive to deliver only the best quality products. Every item is carefully checked and packed before shipping to ensure a perfect shopping experience.
            </p>
            <p className="text-amber-100 text-base text-center font-semibold">
              Please read our Returns and Refund Policy carefully before placing an order.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
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

                    {section.warning && (
                      <div className="bg-red-900/30 border border-red-400/40 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-300 flex-shrink-0 mt-0.5" />
                        <p className="text-red-200 font-semibold">{section.warning}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-8 shadow-2xl text-center">
            <p className="text-amber-50 text-lg leading-relaxed">
              We appreciate your understanding and trust in <span className="text-yellow-300 font-bold">triakshi.co.in</span> – where every product is delivered with care and commitment to quality.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-orange-200">
              <Mail className="w-5 h-5" />
              <a href="mailto:triakshijewels@gmail.com" className="hover:text-yellow-300 transition-colors">
                triakshijewels@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}