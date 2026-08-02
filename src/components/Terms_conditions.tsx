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
      icon: "📋",
      title: "General Information",
      color: "from-yellow-400/20 to-orange-500/10",
      content: "triakshi.co.in is owned and operated by Life Is Divine. Throughout the site, the terms \"we\", \"us\", and \"our\" refer to Triakshi.co.in. By using our website, you agree that:",
      isList: true,
      items: [
        "You are at least 18 years old or using the site under the supervision of a parent/guardian",
        "You will use the website for lawful purposes only",
        "You will provide accurate and complete information during registration or purchase"
      ]
    },
    {
      id: 2,
      icon: "🛍️",
      title: "Product Information",
      color: "from-orange-400/20 to-red-500/10",
      content: "We strive to display all products and descriptions as accurately as possible. However, minor color variations or appearance differences may occur due to lighting, photography, or screen display settings. All product prices shown on triakshi.co.in are inclusive of GST."
    },
    {
      id: 3,
      icon: "💳",
      title: "Orders and Payments",
      color: "from-red-400/20 to-orange-500/10",
      isList: true,
      items: [
        "All orders placed on the website are subject to acceptance and availability",
        "We reserve the right to cancel or refuse any order at our discretion",
        "Payments can be made securely through our trusted online payment gateways",
        "In case of online payments, triakshi.co.in does not store any card or banking details"
      ]
    },
    {
      id: 4,
      icon: "🚚",
      title: "Shipping & Delivery",
      color: "from-orange-400/20 to-yellow-500/10",
      isList: true,
      items: [
        "Orders are usually processed within 2-3 working days and delivered within 10-12 working days after dispatch",
        "Shipping timelines may vary depending on your location or courier delays",
        "For full details, please read our Shipping Policy"
      ]
    },
    {
      id: 5,
      icon: "↩️",
      title: "Returns and Refunds",
      color: "from-yellow-400/20 to-orange-500/10",
      isList: true,
      items: [
        "We do not accept returns or exchanges once the product has been delivered",
        "For more details, refer to our Return & Refund Policy"
      ],
      highlight: true
    },
    {
      id: 6,
      icon: "©️",
      title: "Intellectual Property",
      color: "from-orange-400/20 to-red-500/10",
      content: "All content on triakshi.co.in, including text, images, graphics, logos, designs, and product descriptions, is the intellectual property of Triakshi.co.in and protected under applicable copyright laws. You may not:",
      isList: true,
      items: [
        "Copy, reproduce, or distribute any material from our website without prior written consent",
        "Use our trademarks, product images, or content for commercial or misleading purposes"
      ]
    },
    {
      id: 7,
      icon: "🛡️",
      title: "Limitation of Liability",
      color: "from-red-400/20 to-orange-500/10",
      content: "triakshi.co.in shall not be held responsible for:",
      isList: true,
      items: [
        "Any indirect, incidental, or consequential damages resulting from product use or misuse",
        "Delays or delivery failures due to natural calamities, courier issues, or circumstances beyond our control"
      ],
      note: "Our total liability for any claim shall not exceed the amount paid by the customer for that specific order.",
      highlight: true
    },
    {
      id: 8,
      icon: "🚫",
      title: "User Conduct",
      color: "from-orange-400/20 to-yellow-500/10",
      content: "You agree not to:",
      isList: true,
      items: [
        "Engage in any unlawful activity through our website",
        "Upload or share harmful, abusive, or offensive content",
        "Attempt to hack, disrupt, or misuse our website or data systems"
      ],
      note: "Violation of these terms may lead to suspension or permanent blocking of your access."
    },
    {
      id: 9,
      icon: "🔗",
      title: "Third-Party Links",
      color: "from-yellow-400/20 to-orange-500/10",
      content: "Our website may include links to third-party websites or tools for convenience. We are not responsible for the privacy practices, content, or accuracy of information on these external sites."
    },
    {
      id: 10,
      icon: "⚖️",
      title: "Governing Law",
      color: "from-orange-400/20 to-red-500/10",
      content: "These Terms & Conditions are governed by and interpreted according to the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Uttar Pradesh."
    },
    {
      id: 11,
      icon: "📝",
      title: "Changes to Terms",
      color: "from-red-400/20 to-orange-500/10",
      content: "triakshi.co.in reserves the right to modify or update these Terms & Conditions at any time. Updates will be reflected on this page with the revised \"Effective Date.\" Continued use of the website after such updates implies your acceptance of the new terms."
    },
    {
      id: 12,
      icon: "📧",
      title: "Contact Us",
      color: "from-orange-400/20 to-yellow-500/10",
      content: "For any questions about these Terms & Conditions, please contact:",
      isList: true,
      items: [
        "Email: triakshijewels@gmail.com",
        "Website: www.triakshi.co.in"
      ]
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
          <p className="text-amber-300 text-sm mt-4">Owned & Operated by Life Is Divine</p>
        </div>

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <p className="text-amber-50 text-lg leading-relaxed mb-4">
              Welcome to <span className="font-bold text-yellow-300">triakshi.co.in</span>!
            </p>
            <p className="text-amber-100 text-lg leading-relaxed">
              These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing or making a purchase on <span className="font-bold text-orange-200">triakshi.co.in</span>, you agree to be bound by these terms. If you do not agree, please refrain from using our website.
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

                    {section.note && (
                      <p className="text-amber-200 leading-relaxed text-sm italic">{section.note}</p>
                    )}

                    {section.title === "Contact Us" && (
                      <div className="flex items-center gap-2 pt-2">
                        <Mail className="w-4 h-4 text-yellow-300" />
                        <span className="text-amber-300 text-sm">We usually respond within 1-2 business days</span>
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
      </div>
    </div>
  );
}