import { AlertCircle, CheckCircle, ChevronDown, Clock, CreditCard, Mail, Phone, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function PaymentsRefund() {
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
      icon: "💳",
      title: "Accepted Payment Methods",
      color: "from-yellow-400/20 to-orange-500/10",
      isList: true,
      items: [
        "Credit/Debit Cards",
        "UPI/Net Banking",
        "Wallets",
        "Other payment gateways (as available on the website)"
      ],
      footer: "All transactions are processed securely through trusted third-party payment processors."
    },
    {
      id: 2,
      icon: "✅",
      title: "Booking and Confirmation",
      color: "from-orange-400/20 to-red-500/10",
      isList: true,
      items: [
        "All bookings for consultations, reports, or events must be paid for in advance",
        "You will receive a confirmation email after a successful payment",
        "Please ensure that you provide accurate details (including birth details) at the time of booking"
      ]
    },
    {
      id: 3,
      icon: "💰",
      title: "Pricing",
      color: "from-red-400/20 to-orange-500/10",
      isList: true,
      items: [
        "All prices are listed in INR and are inclusive of applicable taxes unless stated otherwise",
        "We reserve the right to update prices or service offerings at any time without prior notice"
      ]
    },
    {
      id: 4,
      icon: "🔄",
      title: "Refund Policy",
      color: "from-orange-400/20 to-yellow-500/10",
      highlight: true,
      content: "Due to the personalized nature of astrology services, all sales are final and non-refundable, except in the following cases:",
      exceptions: [
        "You are charged twice for the same service",
        "Your session is cancelled by us and cannot be rescheduled",
        "You made a payment but did not receive any confirmation or service within the expected timeframe"
      ],
      footer: "If you believe you are eligible for a refund, please contact us within 48 hours of the transaction at acharyaashoknarayann@gmail.com."
    },
    {
      id: 5,
      icon: "📅",
      title: "Rescheduling Policy",
      color: "from-yellow-400/20 to-orange-500/10",
      isList: true,
      items: [
        "If you need to reschedule a consultation, please inform us at least 24 hours in advance",
        "Rescheduling is subject to availability and confirmation from our side"
      ]
    },
    {
      id: 6,
      icon: "⛔",
      title: "Cancellations",
      color: "from-orange-400/20 to-red-500/10",
      highlight: true,
      isList: true,
      items: [
        "Cancellations by the client will not be eligible for a refund",
        "If a session is cancelled by us due to unforeseen circumstances, a full refund or rescheduling will be offered"
      ]
    },
    {
      id: 7,
      icon: "🔧",
      title: "Dispute Resolution",
      color: "from-red-400/20 to-orange-500/10",
      content: "If you have a payment-related issue, please contact us first so we can resolve it promptly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-300 rounded-full opacity-5 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-12 px-6">
          <div className="flex justify-center mb-6 animate-bounce">
            <CreditCard className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-4">
            Payments & Refund Policy
          </h1>
          <p className="text-xl text-amber-100 font-semibold">Clear, Transparent, and Fair</p>
          <p className="text-amber-300 text-sm mt-4">Effective Date: 25 April 2025</p>
        </div>

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <p className="text-amber-50 text-lg leading-relaxed">
              This policy outlines the terms related to payments, bookings, and refunds for services offered on <span className="font-bold text-yellow-300">triakshi.co.in</span> ("we", "our", "us").
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

              <div className={`relative bg-gradient-to-br from-amber-800/60 to-orange-800/40 backdrop-blur-sm border-2 transition-all duration-300 rounded-xl shadow-2xl ${
                section.highlight 
                  ? 'border-red-400/60 group-hover:border-red-300/80' 
                  : 'border-yellow-400/40 group-hover:border-yellow-300/70'
              }`}>
                {/* Highlight Badge */}
                {section.highlight && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <AlertCircle className="w-3 h-3" />
                    Important
                  </div>
                )}

                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-yellow-400/5 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl drop-shadow-lg">{section.icon}</span>
                    <div className="text-left">
                      <h2 className="text-2xl font-bold text-yellow-300">{section.title}</h2>
                      <p className="text-amber-300 text-xs mt-1">Section {section.id}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-orange-300 transition-transform duration-300 flex-shrink-0 ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expandable Content */}
                {expandedSections[section.id] && (
                  <div className="px-8 pb-6 border-t border-yellow-400/20 space-y-4 animate-fadeIn">
                    {section.content && (
                      <p className="text-amber-100 leading-relaxed text-base font-semibold">{section.content}</p>
                    )}

                    {section.isList && section.items && (
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <span className="text-amber-50">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.exceptions && (
                      <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 space-y-3">
                        <p className="text-amber-100 font-semibold">Exceptions:</p>
                        <ul className="space-y-2">
                          {section.exceptions.map((exception, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-yellow-400 mt-1 flex-shrink-0">✓</span>
                              <span className="text-amber-50">{exception}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.footer && (
                      <div className="bg-orange-400/10 border border-orange-400/30 rounded-lg p-4">
                        <p className="text-amber-50 italic">{section.footer}</p>
                      </div>
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

        {/* Key Points Summary */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-300 mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-4xl">📌</span>
              Key Points to Remember
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-900/50 to-red-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-yellow-300">Payment in Advance</h3>
                </div>
                <p className="text-amber-50">All bookings must be paid in advance with a confirmation email upon successful payment.</p>
              </div>

              <div className="bg-gradient-to-br from-red-900/50 to-orange-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <RefreshCw className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-yellow-300">Final & Non-Refundable</h3>
                </div>
                <p className="text-amber-50">All sales are final and non-refundable except in specific circumstances listed above.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-900/50 to-red-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-yellow-300">48-Hour Window</h3>
                </div>
                <p className="text-amber-50">Refund requests must be made within 48 hours of the transaction if eligible.</p>
              </div>

              <div className="bg-gradient-to-br from-red-900/50 to-orange-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-yellow-300">24-Hour Notice</h3>
                </div>
                <p className="text-amber-50">Rescheduling requires at least 24 hours notice and is subject to availability.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-300 mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-4xl">📞</span>
              Need Assistance?
            </h2>
            <p className="text-amber-100 text-center text-lg mb-10">
              For payment-related issues or disputes, please contact us and we'll resolve it promptly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="bg-gradient-to-br from-orange-900/50 to-red-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-8 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold text-yellow-300">Email</h3>
                </div>
                <a
                  href="mailto:acharyaashoknarayann@gmail.com"
                  className="text-amber-50 hover:text-yellow-200 transition-colors text-lg break-all font-semibold"
                >
                  acharyaashoknarayann@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-red-900/50 to-orange-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-8 hover:border-yellow-300/70 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold text-yellow-300">Phone</h3>
                </div>
                <a
                  href="tel:+918130268434"
                  className="text-amber-50 hover:text-yellow-200 transition-colors text-lg font-semibold"
                >
                  +91 8130268434
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Security Box */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-amber-900/70 to-orange-900/60 backdrop-blur-sm border-2 border-yellow-400/40 rounded-2xl p-10 shadow-2xl text-center">
            <p className="text-amber-100 text-lg leading-relaxed">
              <span className="text-yellow-300 font-bold">Your Financial Security is Our Priority</span>. All transactions are processed through trusted, secure payment gateways to protect your sensitive information.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-12 border-t border-yellow-400/30">
          <div className="flex justify-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-yellow-300 animate-bounce" />
            <RefreshCw className="w-6 h-6 text-orange-300 animate-bounce delay-100" />
            <CreditCard className="w-6 h-6 text-yellow-300 animate-bounce delay-200" />
          </div>
          <p className="text-amber-200 text-sm mb-2">
            © Triakshi by Ashok Narayann Guruji • Secure Payments
          </p>
          <p className="text-amber-300 text-xs">
            Effective Date: 25 April 2025 | All Payments in INR
          </p>
        </div>
      </div>
    </div>
  );
}