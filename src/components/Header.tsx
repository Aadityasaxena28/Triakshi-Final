import { TokenValidation } from "@/API/Auth";
import { Button } from "@/components/ui/button";
import { toastInfo } from "@/utlity/AlertSystem";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Gem, LogOut, Menu, Share2, ShoppingCart, User, UserCircle, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  // Mobile-specific states
  const [mobileCalcOpen, setMobileCalcOpen] = useState<boolean>(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState<boolean>(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState<boolean>(false);

  const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem("tg_token");
  const hasUser = !!localStorage.getItem("tg_user");

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["validateToken", token],
    queryFn: async () => {
      if (!token) throw new Error("Missing token");
      return TokenValidation(token);
    },
    enabled: hasUser && !!token,
    retry: false,
  });

  // Fetch cart items count using React Query
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
    refetchInterval: 1000*60, // Refetch every 5 seconds
    staleTime: 3000,
  });

  // Update cart count when data changes
  useEffect(() => {
    if (cartData?.success && cartData?.items) {
      const count = cartData.items.reduce((sum: number, item: any) => sum + (item.qty || 0), 0);
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
      setIsProfileOpen(false);
      setMobileProfileOpen(false);
      setIsMenuOpen(false);
      window.location.reload();
    }
    if (isSuccess && data) {
      if (!data.success) {
        toastInfo("Token has expired, please re-login.");
        localStorage.removeItem("tg_user");
        localStorage.removeItem("tg_token");
        setIsProfileOpen(false);
        setMobileProfileOpen(false);
        setIsMenuOpen(false);
        window.location.reload();
      } else {
        setLoggedIn(true);
      }
    }
  }, [isError, isSuccess, data]);

  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { name: "Gemstones", path: "/gemstones" },
    { name: "Rudraksh", path: "/rudraksha" },
    { name: "Yantra", path: "/yantra" },
    { name: "Tribhuvani", path: "/tribhuvani" },
    { name: "Mala & Bracelets", path: "/mala" },
    { name: "Books",path:"/books"},
    //{ name: "Spirtual products",path:"/"}
  ];

  const calculatorItems: MenuItem[] = [
    { name: "Life Stone Calculator", path: "/life-calculator" },
    { name: "Health Stone Calculator", path: "/health-stone-calculator" },
    { name: "Lucky Stone Calculator", path: "/lucky-stone-calculator" },
    //{ name: "Rudraksh Calculator", path: "/health-calculator" },
    { name: "GemStone Report", path: "/report" },
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

  const handleAuthClick = (): void => {
    if (!isLoggedIn) navigate("/login");
    else setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("tg_user");
    localStorage.removeItem("tg_token");
    setIsProfileOpen(false);
    setMobileProfileOpen(false);
    setIsMenuOpen(false);
    window.location.reload();
  };

  const handleCalcMouseEnter = (): void => {
    if (calcTimerRef.current) clearTimeout(calcTimerRef.current);
    setIsCalcOpen(true);
    setIsAboutOpen(false);
    setIsProfileOpen(false);
  };

  const handleCalcMouseLeave = (): void => {
    calcTimerRef.current = setTimeout(() => setIsCalcOpen(false), 300);
  };

  const handleAboutMouseEnter = (): void => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    setIsAboutOpen(true);
    setIsCalcOpen(false);
    setIsProfileOpen(false);
  };

  const handleAboutMouseLeave = (): void => {
    aboutTimerRef.current = setTimeout(() => setIsAboutOpen(false), 300);
  };

  const handleProfileMouseEnter = (): void => {
    if (profileTimerRef.current) clearTimeout(profileTimerRef.current);
    if (isLoggedIn) {
      setIsProfileOpen(true);
      setIsCalcOpen(false);
      setIsAboutOpen(false);
    }
  };

  const handleProfileMouseLeave = (): void => {
    profileTimerRef.current = setTimeout(() => setIsProfileOpen(false), 300);
  };

  const handleDropdownItemClick = () => {
    setIsCalcOpen(false);
    setIsAboutOpen(false);
    setIsProfileOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileCalcOpen(false);
    setMobileAboutOpen(false);
    setMobileProfileOpen(false);
  };

  const scrollToNewArrivals = () => {
    const newArrivalsSection = document.getElementById("new-arrivals");
    if (newArrivalsSection) {
      newArrivalsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <style>{`
        @keyframes glareMove {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-glare {
          background: linear-gradient(
            90deg,
            #D4AF37 0%,
            #FFD700 25%,
            #FFFFFF 50%,
            #FFD700 75%,
            #D4AF37 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glareMove 3s linear infinite;
          font-weight: bold;
        }
        @keyframes glowRed {
          0%, 100% {
            box-shadow: 0 0 5px rgba(239, 68, 68, 0.5), 0 0 10px rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3);
          }
        }
        .glow-red {
          animation: glowRed 2s ease-in-out infinite;
        }
      `}</style>

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/20 shadow-card overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-2 rounded-xl shadow-elegant">
                  <Gem className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl golden-glare">त्रिakshi Gems</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium text-sm"
                  onClick={() => {
                    setIsCalcOpen(false);
                    setIsAboutOpen(false);
                    setIsProfileOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Calculator Dropdown */}
              <div className="relative" onMouseEnter={handleCalcMouseEnter} onMouseLeave={handleCalcMouseLeave}>
                <button className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium text-sm">
                  Calculator
                </button>
                {isCalcOpen && (
                  <div className="absolute bg-white shadow-lg rounded-xl mt-2 w-56 border border-border/20 py-2">
                    {calculatorItems.map((calc) => (
                      <Link
                        key={calc.name}
                        to={calc.path}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-smooth"
                        onClick={handleDropdownItemClick}
                      >
                        {calc.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About Us Dropdown */}
              <div className="relative" onMouseEnter={handleAboutMouseEnter} onMouseLeave={handleAboutMouseLeave}>
                <button className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium text-sm">
                  About Us
                </button>
                {isAboutOpen && (
                  <div className="absolute bg-white shadow-lg rounded-xl mt-2 w-48 border border-border/20 py-2">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-smooth"
                        onClick={handleDropdownItemClick}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                className="bg-red-500 text-white rounded-xl hover:bg-red-600 glow-red px-4 py-2 text-sm"
                onClick={scrollToNewArrivals}
              >
                NEW
              </Button>

              {/* Cart Button */}
              <Button variant="outline" className="relative rounded-full p-2" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {!isLoggedIn ? (
                <Button className="btn-primary rounded-full px-6" onClick={handleAuthClick}>
                  Login/SignUp
                </Button>
              ) : (
                <div className="relative" onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave}>
                  <Button variant="outline" className="rounded-full p-2" onClick={handleAuthClick}>
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
                            className="flex items-center space-x-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-smooth"
                            onClick={handleDropdownItemClick}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                      <hr className="my-2 border-border/20" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-smooth w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Right Side - Cart Icon + Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Cart Icon */}
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

              {/* Mobile Menu Button */}
              <button
                className="p-2 rounded-lg hover:bg-secondary transition-smooth"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4 text-foreground" /> : <Menu className="h-4 w-4 text-foreground" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute left-0 right-0 top-16 bg-white border-b border-border/20 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="px-4 py-4 space-y-2">
                {/* Quick Action Buttons */}
                <div className="flex gap-2 pb-4 border-b border-border/20">
                  <Button
                    className="bg-red-500 text-white rounded-xl hover:bg-red-600 glow-red flex-1 text-sm"
                    onClick={() => {
                      scrollToNewArrivals();
                      closeMobileMenu();
                    }}
                  >
                    NEW
                  </Button>
                  <Button
                    variant="outline"
                    className="relative rounded-xl flex-1 text-sm"
                    onClick={() => {
                      navigate("/cart");
                      closeMobileMenu();
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {cartItemCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </div>


                {/* Menu Items */}
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-smooth font-medium"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Calculator Accordion */}
                <div className="border-t border-border/20 pt-2">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-smooth font-medium"
                    onClick={() => setMobileCalcOpen(!mobileCalcOpen)}
                  >
                    <span>Calculator</span>
                    {mobileCalcOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {mobileCalcOpen && (
                    <div className="pl-4 space-y-1 mt-1">
                      {calculatorItems.map((calc) => (
                        <Link
                          key={calc.name}
                          to={calc.path}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-smooth"
                          onClick={closeMobileMenu}
                        >
                          {calc.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* About Us Accordion */}
                <div>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-smooth font-medium"
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  >
                    <span>About Us</span>
                    {mobileAboutOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {mobileAboutOpen && (
                    <div className="pl-4 space-y-1 mt-1">
                      {aboutItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-smooth"
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile Section for Logged In Users */}
                {isLoggedIn ? (
                  <div className="border-t border-border/20 pt-2">
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-smooth font-medium"
                      onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>My Account</span>
                      </div>
                      {mobileProfileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {mobileProfileOpen && (
                      <div className="pl-4 space-y-1 mt-1">
                        {profileItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="flex items-center space-x-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-smooth"
                              onClick={closeMobileMenu}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.name}</span>
                            </Link>
                          );
                        })}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-smooth w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-t border-border/20 pt-4">
                    <Button
                      className="btn-primary w-full rounded-full"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/login");
                      }}
                    >
                      Login/SignUp
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
 
export default Header;