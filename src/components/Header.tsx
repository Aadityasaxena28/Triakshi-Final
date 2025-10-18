import { Button } from "@/components/ui/button";
import { Gem, LogOut, Menu, Share2, ShoppingCart, User, UserCircle, X } from "lucide-react";
import React, { useRef, useState } from "react";
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

  const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoggedIn: boolean = !!localStorage.getItem("tg_user");
  const navigate = useNavigate();

  // 🟢 Updated menu items (Bracelets removed, Mala renamed)
  const menuItems: MenuItem[] = [
    { name: "Gemstones", path: "/gemstones" },
    { name: "Rudraksh", path: "/rudraksha" },
    { name: "Mala & Bracelets", path: "/mala" },
    // { name: "Refer & Earn", path: "/refer-earn" },
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
    // { name: "Our Blogs", path: "/blogs" },
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
    setIsProfileOpen(false);
    navigate("/");
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

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/20 shadow-card overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-xl shadow-elegant">
                <Gem className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Triakshi Gems</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium"
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
            <div
              className="relative"
              onMouseEnter={handleCalcMouseEnter}
              onMouseLeave={handleCalcMouseLeave}
            >
              <button className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium">
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
            <div
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium">
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
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-red-500 text-white rounded-xl hover:bg-red-600">
              NEW
            </Button>
            <Button className="btn-primary">On Sale</Button>

            {!isLoggedIn ? (
              <Button
                className="btn-primary rounded-full px-6"
                onClick={handleAuthClick}
              >
                Login/SignUp
              </Button>
            ) : (
              <div
                className="relative"
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
              >
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4 text-foreground" /> : <Menu className="h-4 w-4 text-foreground" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;