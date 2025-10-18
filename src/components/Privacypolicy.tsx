import { ChevronDown, Lock, Mail, Phone, Shield } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPolicy() {
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
      icon: "📋",
      title: "Information We Collect",
      color: "from-yellow-400/20 to-orange-500/10",
      subsections: [
        {
          subtitle: "Personal Information",
          description: "We may collect personal details that you voluntarily provide when booking a consultation or astrology session, submitting a contact form, subscribing to our newsletter, or making a purchase.",
          details: [
            "Full name",
            "Email address",
            "Phone number",
            "Date, time, and place of birth",
            "Billing and payment information (processed securely by third-party providers)"
          ]
        },
        {
          subtitle: "Technical/Usage Information",
          description: "Automatically collected data may include:",
          details: [
            "IP address",
            "Browser type",
            "Device information",
            "Pages visited, time spent, and navigation patterns"
          ]
        }
      ]
    },
    {
      id: 2,
      icon: "✨",
      title: "How We Use Your Information",
      color: "from-orange-400/20 to-red-500/10",
      usage: [
        "Provide personalized astrology services and consultations",
        "Respond to your inquiries and support needs",
        "Send you confirmations, updates, and newsletters (with your consent)",
        "Analyze and improve our website's performance and user experience",
        "Comply with legal obligations"
      ]
    },
    {
      id: 3,
      icon: "🍪",
      title: "Cookies and Tracking Technologies",
      color: "from-red-400/20 to-orange-500/10",
      description: "We use cookies and similar technologies to understand website usage and improve content, remember your preferences, and provide relevant advertising (if applicable). You may disable cookies through your browser settings, but this may limit certain website features."
    },
    {
      id: 4,
      icon: "🤝",
      title: "Sharing Your Information",
      color: "from-orange-400/20 to-yellow-500/10",
      description: "We do not sell or rent your personal information. We may share your information only with trusted third-party service providers (e.g., payment processors, email platforms) and legal authorities when required by law or to protect our rights."
    },
    {
      id: 5,
      icon: "🔐",
      title: "Data Security",
      color: "from-yellow-400/20 to-orange-500/10",
      description: "We implement appropriate technical and organizational measures to protect your data. While we strive for maximum security, no method of internet transmission is 100% secure."
    },
    {
      id: 6,
      icon: "👤",
      title: "Your Rights",
      color: "from-orange-400/20 to-red-500/10",
      description: "Depending on your jurisdiction, you may have the right to access, update, or delete your personal data, withdraw consent for communication, request information on how your data is used, and lodge a complaint with a regulatory authority.",
      cta: "To exercise your rights, please contact us at acharyaashoknarayann@gmail.com"
    },
    {
      id: 7,
      icon: "🔗",
      title: "Third-Party Links",
      color: "from-red-400/20 to-orange-500/10",
      description: "Our website may contain links to external sites. We are not responsible for their privacy practices or content. Please review their policies separately."
    },
    {
      id: 8,
      icon: "👶",
      title: "Children's Privacy",
      color: "from-orange-400/20 to-yellow-500/10",
      description: "Our services are not intended for individuals under the age of 18. We do not knowingly collect data from minors."
    },
    {
      id: 9,
      icon: "📝",
      title: "Policy Updates",
      color: "from-yellow-400/20 to-orange-500/10",
      description: "We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date."
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
            <Shield className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-amber-100 font-semibold">Your Trust, Our Commitment</p>
        </div>

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <p className="text-amber-50 text-lg leading-relaxed">
              Welcome to <span className="font-bold text-yellow-300">astroashoknarayan.com</span> ("we", "our", "us"). We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit or use our website and services.
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
                    {/* Subsections for Info Collection */}
                    {section.subsections && section.subsections.map((sub, idx) => (
                      <div key={idx}>
                        <h3 className="text-xl font-bold text-orange-200 mb-3">{sub.subtitle}</h3>
                        <p className="text-amber-100 leading-relaxed mb-4">{sub.description}</p>
                        <ul className="space-y-2">
                          {sub.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-yellow-400 mt-1">•</span>
                              <span className="text-amber-50">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Usage List */}
                    {section.usage && (
                      <ul className="space-y-3">
                        {section.usage.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="text-amber-50">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* General Description */}
                    {section.description && !section.subsections && (
                      <p className="text-amber-100 leading-relaxed">{section.description}</p>
                    )}

                    {/* CTA */}
                    {section.cta && (
                      <p className="text-amber-50 italic bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                        {section.cta}
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
              Contact Us
            </h2>
            <p className="text-amber-100 text-center text-lg mb-8">
              If you have any questions or concerns about this Privacy Policy, please reach out to us:
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

        {/* Footer */}
        <div className="text-center py-12 border-t border-yellow-400/30">
          <div className="flex justify-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-yellow-300 animate-bounce" />
            <Lock className="w-6 h-6 text-orange-300 animate-bounce delay-100" />
            <Lock className="w-6 h-6 text-yellow-300 animate-bounce delay-200" />
          </div>
          <p className="text-amber-200 text-sm mb-2">
            © Triakshi by Ashok Narayann Guruji • Privacy Protected
          </p>
          <p className="text-amber-300 text-xs">
            Last Updated: October 2025
          </p>
        </div>
      </div>
    </div>
  );
}

// Star component (simple replacement)
function Star({ className }) {
  return <span className={className}>✦</span>;
}