import { AlertCircle, CheckCircle, Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactUs() {
  const [queryType, setQueryType] = useState('');
  const [queryText, setQueryText] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issueText, setIssueText] = useState('');
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  const handleQuerySubmit = () => {
    if (queryType && queryText) {
      setQuerySubmitted(true);
      setTimeout(() => {
        setQuerySubmitted(false);
        setQueryType('');
        setQueryText('');
      }, 3000);
    }
  };

  const handleIssueSubmit = () => {
    if (issueType && issueText) {
      setIssueSubmitted(true);
      setTimeout(() => {
        setIssueSubmitted(false);
        setIssueType('');
        setIssueText('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-orange-600 text-center">Contact Us</h1>
          <p className="text-center text-gray-600 mt-2">We're here to help you!</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Queries Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="w-7 h-7 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-orange-600">Queries</h2>
            </div>

            {querySubmitted && (
              <div className="mb-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-green-700 font-semibold">Query submitted successfully! We'll get back to you soon.</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Query Type</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="queryType"
                      value="product"
                      checked={queryType === 'product'}
                      onChange={(e) => setQueryType(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium text-gray-800">Query related to Product Purchased</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="queryType"
                      value="delivery"
                      checked={queryType === 'delivery'}
                      onChange={(e) => setQueryType(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium text-gray-800">Query related to Delivery</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Query</label>
                <textarea
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  rows={5}
                  placeholder="Please describe your query in detail..."
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none transition"
                />
              </div>

              <button
                onClick={handleQuerySubmit}
                disabled={!queryType || !queryText}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Send className="w-5 h-5" />
                Submit Query
              </button>
            </div>
          </div>

          {/* Issues Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-orange-600">Issues</h2>
            </div>

            {issueSubmitted && (
              <div className="mb-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-green-700 font-semibold">Issue reported successfully! Our team will resolve it soon.</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Issue Type</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="issueType"
                      value="product"
                      checked={issueType === 'product'}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium text-gray-800">Issues with Product</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="issueType"
                      value="delivery"
                      checked={issueType === 'delivery'}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium text-gray-800">Issues with Delivery</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Issue</label>
                <textarea
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  rows={5}
                  placeholder="Please provide details about the issue you're facing..."
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none transition"
                />
              </div>

              <button
                onClick={handleIssueSubmit}
                disabled={!issueType || !issueText}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Send className="w-5 h-5" />
                Report Issue
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Triakshi Gems</h2>
            <p className="text-xl mb-8 opacity-90">Your Trusted Partner in Fine Jewelry</p>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 mb-6">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-lg mb-8">You can reach out to us over phone or email:</p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition">
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg">
                    <Phone className="w-6 h-6 flex-shrink-0" />
                  </div>
                  <a href="tel:+918130268434" className="text-xl font-semibold hover:underline">
                    +91-8130268434
                  </a>
                </div>
                
                <div className="flex items-center justify-center gap-4 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition">
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg">
                    <Mail className="w-6 h-6 flex-shrink-0" />
                  </div>
                  <a href="mailto:acharyaashoknarayann@gmail.com" className="text-xl font-semibold hover:underline break-all">
                    acharyaashoknarayann@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <p className="text-lg opacity-90">
              We're available to assist you with any questions or concerns. <br />
              Our team is committed to providing you with the best service!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-orange-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p className="font-medium">© 2024 Triakshi Gems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}