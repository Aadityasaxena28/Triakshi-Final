import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // 🔹 Scroll to "New Arrivals" section
  const scrollToNewArrivals = () => {
    const newArrivalsSection = document.getElementById("new-arrivals");
    if (newArrivalsSection) {
      newArrivalsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 🔹 Update cart count whenever storage changes
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
      const count = storedCart.items
        ? storedCart.items.reduce((acc: number, item: any) => acc + item.quantity, 0)
        : 0;
      setCartItemCount(count);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-900">TRIAKSHI</span>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        <button onClick={scrollToNewArrivals} className="hover:text-gray-900">
          NEW
        </button>
        <Link to="/about-us" className="hover:text-gray-900">
          ABOUT US
        </Link>
        <Link to="/contact-us" className="hover:text-gray-900">
          CONTACT
        </Link>

        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 hover:text-gray-900" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {cartItemCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-4 py-4">
          <button onClick={scrollToNewArrivals} className="hover:text-gray-900">
            NEW
          </button>
          <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>
            ABOUT US
          </Link>
          <Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>
            CONTACT
          </Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
