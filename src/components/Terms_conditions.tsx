import { AlertCircle, ChevronDown, Gavel, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TermsConditions() {
  const [expandedSections, setExpandedSections] = useState({});
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setAnimateCards(true);
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
      icon: "⚡",
      title: "Services Provided",
      color: "from-yellow-400/20 to-orange-500/10",
      content: "We offer personlized gemstone recommendation. Our services do not constitute medical, legal, or financial advice."
    },
    {
      id: 2,
      icon: "👤",
      title: "Eligibility",
      color: "from-orange-400/20 to-red-500/10",
      content: "You must be at least 18 years old to use our services. By using our Site, you represent and warrant that you are of legal age."
    },
    {
      id: 3,
      icon: "✋",
      title: "User Responsibilities",
      color: "from-red-400/20 to-orange-500/10",
      isList: true,
      items: [
        "Provide accurate, current, and complete information",
        "Not use the Site for any unlawful or prohibited activities",
        "Respect the rights of other users and our intellectual property"
      ]
    },
    {
      id: 4,
      icon: "💳",
      title: "Payments and Refunds",
      color: "from-orange-400/20 to-yellow-500/10",
      content: "All payments are final unless otherwise stated. We may offer refunds or credits at our sole discretion. Refund policies for specific services (e.g., readings or webinars) will be detailed on the relevant service page."
    },
    {
      id: 5,
      icon: "©️",
      title: "Intellectual Property",
      color: "from-yellow-400/20 to-orange-500/10",
      content: "All content on this Site, including but not limited to text, graphics, logos, and images, is our property or licensed to us. You may not copy, reproduce, or distribute any content without prior written permission."
    },
    {
      id: 6,
      icon: "⚠️",
      title: "Disclaimer",
      color: "from-orange-400/20 to-red-500/10",
      content: "All services are provided \"as is\" without warranties of any kind. Astrology is not a science and results may vary. We do not guarantee the accuracy, reliability, or completeness of any information provided.",
      highlight: true
    },
    {
      id: 7,
      icon: "🛡️",
      title: "Limitation of Liability",
      color: "from-red-400/20 to-orange-500/10",
      content: "We are not liable for any indirect, incidental, or consequential damages arising from your use of our Site or services.",
      highlight: true
    },
    {
      id: 8,
      icon: "🔒",
      title: "Privacy Policy",
      color: "from-orange-400/20 to-yellow-500/10",
      content: "Your use of our Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference."
    },
    {
      id: 9,
      icon: "📝",
      title: "Modifications to Terms",
      color: "from-yellow-400/20 to-orange-500/10",
      content: "We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of those changes."
    },
    {
      id: 10,
      icon: "⚖️",
      title: "Governing Law",
      color: "from-orange-400/20 to-red-500/10",
      content: "These Terms shall be governed by and construed in accordance with the laws of Uttar Pradesh."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-red-300 rounded-full opacity-5 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-12 px-6">
          <div className="flex justify-center mb-6 animate-bounce">
            <Gavel className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-amber-100 font-semibold">Please Read Carefully</p>
          <p className="text-amber-300 text-sm mt-4">Last Updated: 25 April 2025</p>
        </div>

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <p className="text-amber-50 text-lg leading-relaxed mb-4">
              Welcome to our website <span className="font-bold text-yellow-300">triakshi.co.in</span>. 
            </p>
            <p className="text-amber-100 text-lg leading-relaxed">
              By accessing or using our website located at <span className="font-bold text-orange-200">triakshi.co.in</span> (the "Site"), you agree to be bound by these Terms and Conditions (the "Terms"). Please read them carefully before using our services.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className={`max-w-4xl mx-auto px-6 mb-16 space-y-6 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`group relative transform transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
                      {section.id <= 10 && (
                        <p className="text-amber-300 text-xs mt-1">Section {section.id}</p>
                      )}
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
                      <p className="text-amber-100 leading-relaxed text-base">{section.content}</p>
                    )}

                    {section.isList && section.items && (
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-yellow-400 mt-1 flex-shrink-0">✦</span>
                            <span className="text-amber-50">{item}</span>
                          </li>
                        ))}
                      </ul>
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

        {/* ... (rest of the code remains unchanged) ... */}
      </div>
    </div>
  );
}
