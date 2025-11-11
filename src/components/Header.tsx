import { TokenValidation } from "@/API/Auth";
import { Button } from "@/components/ui/button";
import { toastInfo } from "@/utlity/AlertSystem";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Gem,
  LogOut,
  Menu,
  Share2,
  ShoppingCart,
  User,
  UserCircle,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const token = localStorage.getItem("tg_token");
  const hasUser = !!localStorage.getItem("tg_user");

  const navigate = useNavigate();

  // ✅ Added new menu categories here
  const menuItems: MenuItem[] = [
    { name: "Gemstones", path: "/gemstones" },
    { name: "Rudraksh", path: "/rudraksha" },
    { name: "Yantra", path: "/yantra" },
    { name: "Tribhuvani", path: "/tribhuvani" },
    { name: "Mala & Bracelets", path: "/mala" },
  ];

  const calculatorItems: MenuItem[] = [
    { name: "Life Stone Calculator", path: "/life-calculator" },
    { name: "Health Stone Calculator", path: "/health-calculator" },
    { name: "Lucky Stone Calculator", path: "/lucky-stone-calculator" },
    { name: "Rudraksh Calculator", path: "/health-calculator" },
    { name: "GemStone Report", path: "/health-calculator" },
  ];

  const aboutItems: MenuItem[] = [
    { name: "About Us", path: "/about-us" },
    { name: "Our Blogs", path: "/blogs" },
  ];

  const profileItems = [
    { name: "Profile", path: "/profile", icon: UserCircle },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
    { name: "Refer & Earn", path: "/refer-earn", icon: Share2 },
  ];

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["validateToken", token],
    queryFn: async () => {
      if (!token) throw new Error("Missing token");
      return TokenValidation(token);
    },
    enabled: hasUser && !!token,
    retry: false,
  });

  const { data: cartData } = useQuery({
    queryKey: ["cart-count"],
    queryFn: async () => {
      try {
        const { getCartItems } = await import("@/API/Cart");
        const result = await getCartItems();
        return result;
      } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
      }
    },
    enabled: isLoggedIn,
    refetchInterval: 5000,
    staleTime: 3000,
  });

  useEffect(() => {
    if (cartData?.success && cartData?.items) {
      const count = cartData.items.reduce(
        (sum: number, item: any) => sum + (item.qty || 0),
        0
      );
      setCartItemCount(count);
    } else {
      setCartItemCount(0);
    }
  }, [cartData]);

  useEffect(() => {
    if (isError) {
      toastInfo("Error validating token. Please re-login.");
      localStorage.removeItem("tg_user");
      localStorage.removeItem("tg_token");
      window.location.reload();
    }

    if (isSuccess && data) {
      if (!data.success) {
        toastInfo("Token has expired, please re-login.");
        localStorage.removeItem("tg_user");
        localStorage.removeItem("tg_token");
        window.location.reload();
      } else {
        setLoggedIn(true);
      }
    }
  }, [isError, isSuccess, data]);

  const handleAuthClick = () => {
    if (!isLoggedIn) navigate("/login");
    else setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("tg_user");
    localStorage.removeItem("tg_token");
    window.location.reload();
  };

  const scrollToNewArrivals = () => {
    const section = document.getElementById("new-arrivals");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/20 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-2 rounded-xl shadow-elegant">
                <Gem className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl golden-glare">Triakshi Gems</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-800 hover:text-amber-700 transition-all text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Dropdown: Calculator */}
            <div
              className="relative"
              onMouseEnter={() => setIsCalcOpen(true)}
              onMouseLeave={() => setIsCalcOpen(false)}
            >
              <button className="text-gray-800 hover:text-amber-700 text-sm font-medium">
                Calculator
              </button>
              {isCalcOpen && (
                <div className="absolute bg-white shadow-lg rounded-xl mt-2 w-56 border border-border/20 py-2">
                  {calculatorItems.map((calc) => (
                    <Link
                      key={calc.name}
                      to={calc.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown: About Us */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="text-gray-800 hover:text-amber-700 text-sm font-medium">
                About Us
              </button>
              {isAboutOpen && (
                <div className="absolute bg-white shadow-lg rounded-xl mt-2 w-48 border border-border/20 py-2">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              className="bg-red-500 text-white rounded-xl hover:bg-red-600 px-4 py-2 text-sm"
              onClick={scrollToNewArrivals}
            >
              NEW
            </Button>

            {/* Removed SALE Button */}

            {/* Cart */}
            <Button
              variant="outline"
              className="relative rounded-full p-2"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {!isLoggedIn ? (
              <Button
                className="btn-primary rounded-full px-6"
                onClick={handleAuthClick}
              >
                Login/SignUp
              </Button>
            ) : (
              <div className="relative">
                <Button
                  variant="outline"
                  className="rounded-full p-2"
                  onClick={handleAuthClick}
                >
                  <User className="h-5 w-5" />
                </Button>
                {isProfileOpen && (
                  <div className="absolute right-0 bg-white shadow-lg rounded-xl mt-2 w-52 border border-border/20 py-2">
                    {profileItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    <hr className="my-2 border-border/20" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-amber-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-800" />
            ) : (
              <Menu className="h-5 w-5 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
