import { Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutUs() {
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const offerings = [
    {
      icon: "💎",
      title: "Certified Gemstones",
      description: "Natural, lab-tested, and astrologically recommended stones by Gemological Laboratory Of India (GLI)."
    },
    {
      icon: "🔱",
      title: "Energized Rudraksha & Malas",
      description: "From Ek Mukhi to Panchmukhi, blessed with specific purposes."
    },
    {
      icon: "📿",
      title: "Spiritual Bracelets & Yantras",
      description: "Designed for protection, manifestation, and energy balance."
    },
    {
      icon: "🌠",
      title: "Personalized Astrological Guidance",
      description: "Receive recommendations directly from Ashok Narayann Guruji."
    }
  ];

  const reasons = [
    "100% Authentic & Lab-Certified Gemstones",
    "Energized through Vedic rituals by Ashok Narayann Guruji",
    "Tailored astrological recommendations for every individual",
    "Secure, transparent, and trustworthy spiritual brand"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-300 rounded-full opacity-5 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-12 px-6">
          <div className="flex justify-center mb-6 animate-bounce">
            <Sparkles className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-4">
            About Triakshi
          </h1>
          <p className="text-xl text-amber-100 font-semibold">The Divine Connection Between You and the Universe</p>
        </div>

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <p className="text-amber-50 text-lg leading-relaxed mb-6">
              Welcome to <span className="font-bold text-yellow-300">Triakshi</span> – a sacred space where energy, purity, and intention come together. Founded and blessed by Astrologer & Tantra Guru <span className="font-bold text-orange-200">Ashok Narayann</span>, we offer authentic gemstones, semi-precious stones, Rudraksha malas, spiritual bracelets, and sacred yantras — each energized and blessed as per ancient Vedic and Tantrik traditions.
            </p>
            <p className="text-amber-100 text-lg leading-relaxed">
              At Triakshi, every product is chosen with deep spiritual insight and astrological precision. Whether you seek to balance your planets, attract prosperity, remove negative energies, or deepen your meditation, our divine collection helps align your aura with cosmic vibrations.
            </p>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
              <span className="text-3xl">🔮</span>
              Our Philosophy
            </h2>
            <p className="text-amber-50 text-lg leading-relaxed mb-4">
              <span className="text-yellow-300 font-bold">Triakshi</span> means "Three-Eyed", symbolizing the divine vision of Lord Shiva — the power of insight, protection, and transformation.
            </p>
            <p className="text-amber-100 text-lg leading-relaxed mb-4">
              Under the guidance of Guruji Ashok Narayann, a renowned astrologer and Tantra master, we believe that true healing happens when material and spiritual energies meet in harmony.
            </p>
            <p className="text-amber-50 text-lg leading-relaxed">
              Each gemstone and Rudraksha is personally checked, purified, and energized by mantra and fire rituals to ensure you receive not just a product, but a living vibration of divine energy.
            </p>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <h2 className="text-4xl font-bold text-center text-yellow-300 mb-12 flex items-center justify-center gap-3">
            <span className="text-4xl">🪶</span>
            What We Offer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((offer, index) => (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${
                  animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Diwali Lamp/Light Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/10 rounded-xl blur-xl group-hover:from-yellow-300/40 group-hover:to-orange-400/20 transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-amber-800/60 to-orange-800/40 backdrop-blur-sm border-2 border-yellow-400/40 rounded-xl p-8 shadow-2xl group-hover:border-yellow-300/70 transition-all duration-300 h-full">
                  <div className="mb-6">
                    <span className="text-6xl drop-shadow-lg">{offer.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-3">{offer.title}</h3>
                  <p className="text-amber-100 leading-relaxed">{offer.description}</p>
                  
                  {/* Decorative Stars */}
                  <div className="absolute top-3 right-3 text-yellow-400 opacity-30 text-xl">✦</div>
                  <div className="absolute bottom-3 left-3 text-orange-300 opacity-20 text-lg">✦</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Triakshi */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <h2 className="text-3xl font-bold text-yellow-300 mb-8 text-center">🙏 Why Choose Triakshi</h2>
          <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-10 shadow-2xl">
            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <Star className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1 group-hover:animate-spin" />
                  <p className="text-amber-50 text-lg group-hover:text-yellow-200 transition-colors">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-12 shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center justify-center gap-3">
              <span className="text-4xl">🌼</span>
              Our Mission
            </h2>
            <p className="text-amber-50 text-lg leading-relaxed">
              To bring the ancient power of astrology and tantra into modern lives through authentic spiritual products — helping every soul align with destiny, heal karmas, and live in divine abundance.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <div className="bg-gradient-to-br from-orange-900/60 to-red-900/60 backdrop-blur-sm border-2 border-yellow-400/40 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-300 mb-8 flex items-center justify-center gap-3">
              <span className="text-4xl">🕉</span>
              Connect with the Divine
            </h2>
            <p className="text-amber-100 text-lg mb-8">
              Every stone, mala, and rudraksha carries a story — your story.
            </p>
            <p className="text-amber-50 text-xl font-semibold mb-8">
              Let Triakshi be your guide to balance, prosperity, and peace.
            </p>
            
            <div className="space-y-4">
              <p className="text-amber-100 text-lg">
                Visit: <span className="text-yellow-300 font-bold">www.triakshi.co.in</span>
              </p>
              <p className="text-amber-100 text-lg">
                Follow: <span className="text-orange-200 font-bold">@AstrologerAshokNarayann</span>
              </p>
              <p className="text-amber-50 italic">
                For personal recommendations & blessings from Ashok Narayann Guruji
              </p>
            </div>
          </div>
        </div>

        {/* Footer Diwali Decoration */}
        <div className="text-center py-12 border-t border-yellow-400/30">
          <div className="flex justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce" />
            <Sparkles className="w-8 h-8 text-orange-300 animate-bounce delay-100" />
            <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce delay-200" />
          </div>
          <p className="text-amber-200 text-sm">
            © Triakshi by Ashok Narayann Guruji • Blessed with Divine Energy
          </p>
        </div>
      </div>
    </div>
  );
}