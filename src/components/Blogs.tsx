import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Sparkles } from 'lucide-react';

const BlogSection = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  useEffect(() => {
    if (selectedBlog) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedBlog]);

  const blogs = [
    {
      id: 1,
      title: "The Timeless Elegance of Yellow Sapphires",
      excerpt: "Discover the rich history and astrological significance of yellow sapphires, one of the most coveted gemstones in Vedic traditions. Learn how these radiant gems bring prosperity and wisdom...",
      image: "",
      author: "Dr. Priya Sharma",
      date: "October 25, 2025",
      fullContent: `Yellow sapphires, known as Pukhraj in Hindi, have captivated humanity for millennia with their warm, golden glow. These precious gemstones belong to the corundum family and are second only to diamonds in hardness, making them both beautiful and durable.

In Vedic astrology, yellow sapphires are associated with Jupiter (Guru), the planet of wisdom, prosperity, and spiritual growth. Wearing a natural yellow sapphire is believed to enhance one's intellect, bring financial stability, and promote overall well-being.

The finest yellow sapphires come from Kashmir, Sri Lanka, and Madagascar. Their color ranges from pale lemon to deep golden honey, with the most valuable specimens displaying a rich, saturated hue without any secondary colors.

When selecting a yellow sapphire, consider the 4Cs: Color (vivid and even), Clarity (minimal inclusions), Cut (well-proportioned for brilliance), and Carat weight. At Triakshi Gems, we ensure each yellow sapphire meets the highest standards of quality and authenticity.

Whether you're drawn to yellow sapphires for their astrological benefits or simply their stunning beauty, these gems make exceptional additions to any jewelry collection. Their warm radiance complements both traditional and contemporary designs, making them versatile choices for rings, pendants, and earrings.`
    },
    {
      id: 2,
      title: "How to Identify Authentic Gemstones",
      excerpt: "In a market flooded with synthetic alternatives, knowing how to identify genuine gemstones is crucial. Our expert guide walks you through professional techniques and simple tests you can perform...",
      image: "",
      author: "Rajesh Kumar",
      date: "October 20, 2025",
      fullContent: `The gemstone market has evolved significantly, with sophisticated treatments and synthetics becoming increasingly common. Understanding how to identify authentic gemstones protects your investment and ensures you receive genuine pieces.

Visual Inspection: Natural gemstones often contain minor inclusions or irregularities that are actually signs of authenticity. Perfect clarity in certain gemstone types should raise questions. Use a jeweler's loupe to examine the stone's internal characteristics.

Weight and Temperature: Natural gemstones are typically denser than glass or plastic imitations. They also feel cool to the touch and take longer to warm up compared to synthetic materials.

Certification: Always insist on certification from recognized gemological laboratories like GIA, IGI, or national gem testing laboratories. These certificates provide detailed analysis of the stone's characteristics and authenticity.

The Scratch Test: While not recommended for valuable pieces, the Mohs hardness scale can help identify gemstones. However, this should only be performed by professionals to avoid damaging the stone.

UV Light Reaction: Many gemstones display characteristic fluorescence under UV light. This can be a useful indicator, though it requires knowledge of specific gemstone properties.

Professional Assessment: When in doubt, consult with certified gemologists. At Triakshi Gems, we provide complete transparency with certification and encourage customers to verify their purchases through independent testing.

Remember, the investment in authentic gemstones is not just financial—it's about owning a piece of Earth's natural beauty that has taken millions of years to form.`
    }
  ];

  const handleShare = (platform) => {
    const blog = selectedBlog;
    const url = window.location.href;
    const text = `Check out this blog: ${blog.title}`;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        alert('To share on Instagram: Take a screenshot of this blog and share it on Instagram. You can add the link in your bio or caption!');
        break;
    }
    setShareMenuOpen(false);
  };

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 shadow-2xl sticky top-0 z-10 border-b-4 border-yellow-600">
          <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-white hover:text-yellow-100 transition-all duration-300 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl hover:bg-white/30 border-2 border-white/30 font-semibold shadow-lg"
            >
              <ArrowLeft size={20} />
              <span>Back to Blogs</span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="flex items-center gap-2 bg-white text-yellow-600 px-6 py-2.5 rounded-xl hover:bg-yellow-50 transition-all duration-300 shadow-lg hover:shadow-xl font-bold border-2 border-white"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
              
              {shareMenuOpen && (
                <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-2xl border-4 border-yellow-400 overflow-hidden w-52">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full px-5 py-4 text-left hover:bg-yellow-50 transition-all duration-300 flex items-center gap-3 text-gray-800 border-b-2 border-yellow-100 font-semibold"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">W</div>
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-5 py-4 text-left hover:bg-yellow-50 transition-all duration-300 flex items-center gap-3 text-gray-800 border-b-2 border-yellow-100 font-semibold"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">f</div>
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('instagram')}
                    className="w-full px-5 py-4 text-left hover:bg-yellow-50 transition-all duration-300 flex items-center gap-3 text-gray-800 font-semibold"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">i</div>
                    <span>Instagram</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-yellow-400">
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 via-transparent to-transparent"></div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 mb-5 leading-tight drop-shadow-sm">
            {selectedBlog.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-700 mb-8 pb-6 border-b-4 border-yellow-300">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                {selectedBlog.author.charAt(0)}
              </div>
              <span className="font-bold text-base text-gray-800">{selectedBlog.author}</span>
            </div>
            <span className="text-yellow-600 font-bold">•</span>
            <span className="text-base font-semibold">{selectedBlog.date}</span>
          </div>
          
          <div className="prose prose-base max-w-none">
            {selectedBlog.fullContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white py-16 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="text-yellow-500 animate-pulse w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 tracking-tight drop-shadow-lg">
            Triakshi Gems
          </h1>
          <Sparkles className="text-amber-500 animate-pulse w-8 h-8 md:w-10 md:h-10" />
        </div>
        <div className="relative inline-block">
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 mb-3 animate-pulse tracking-wider">
            BLOG
          </h2>
          <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 blur-2xl -z-10 rounded-full"></div>
        </div>
        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 font-medium">
          Discover the world of precious gemstones, spiritual wisdom, and timeless elegance
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-yellow-400/50 border-4 border-yellow-400 hover:border-amber-500"
          >
            <div className="relative overflow-hidden h-48">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/70 via-yellow-900/20 to-transparent"></div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-3 line-clamp-2 leading-tight">
                {blog.title}
              </h2>
              
              <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                {blog.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-3 border-b-2 border-yellow-200">
                <span className="font-bold text-amber-600">{blog.author}</span>
                <span className="font-semibold">{blog.date}</span>
              </div>
              
              <button
                onClick={() => setSelectedBlog(blog)}
                className="w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 text-white font-bold py-3 px-5 rounded-2xl hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm"
              >
                Read Full Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;