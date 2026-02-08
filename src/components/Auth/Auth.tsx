import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import nban from "@/assets/newban.jpeg";
import "./Auth.css";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import SignUp from "./SignUp";
import { QueryClient } from "@tanstack/react-query";
import { clearGuestCart, getGuestCart } from "@/utlity/ProductF";
import { mergeGuestCartItems, updateCartItems } from "@/API/Cart";

 

type props = {
  state: string;
};

type AuthLocationState = {
  from?: Location & { pathname?: string; search?: string; hash?: string };
} | null;

export function safeRedirectPath(from?: Location): string {
  // Only allow same-app paths; ignore absolute URLs
  if (!from) return "/home";
  const pathname = from.pathname || "/home";
  const search = from.search || "";
  const hash = from.hash || "";
  
  return `${pathname}${search}${hash}`;
}

const Auth: React.FC<props> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "forget">("login");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const location = useLocation();
  const locState = (location.state as AuthLocationState) ?? null;
  const redirectTo = safeRedirectPath(locState?.from || undefined);

  useEffect(() => {
    if (state === "login" || state === "signup") {
      setActiveTab(state);
    }
  }, [state]);

  const handleForgetPassword = () => {
    setActiveTab("forget");
  };

  const handleBackToLogin = () => {
    setActiveTab("login");
  };



  const handleAuthSuccess = async () => {

  // 2️⃣ Get guest cart
  const guestItems = getGuestCart();

  // 3️⃣ Merge ONLY if items exist
  if (guestItems.length > 0) {
    try {
      await mergeGuestCartItems(guestItems);

      clearGuestCart();
    } catch (err) {
      console.error("Cart merge failed", err);
    }
  }

  // 4️⃣ Fetch server cart
  // await QueryClient.invalidateQueries(["cart"]);
};

  return (
    <div className="auth_body" style={{ backgroundImage: `url(${nban})` }}>
      <div className="auth-container" id="auth-container" style={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'none'
      }}>
        <div className="auth-logo" id="auth-logo">
          <h1 style={{ color: '#FFD700' }}>त्रिakshi Gems</h1>
          <p>
            <span style={{ color: '#FFD700' }}>✨Jai Maa Pitambara✨</span>
            <br />
            <span style={{ color: '#FFD700' }}>Login/SignUp to Proceed , You are just a step away...</span>
          </p>
        </div>

        {activeTab !== "forget" && (
          <div className="auth-tabs" id="auth-tabs">
            <button
              className={`auth-tab ${activeTab === "login" ? "auth-active" : ""}`}
              onClick={() => setActiveTab("login")}
              id="auth-tab-login"
              type="button"
              disabled={isLoginLoading || isSignupLoading}
            >
              Login
            </button>
            <button
              className={`auth-tab ${activeTab === "signup" ? "auth-active" : ""}`}
              onClick={() => setActiveTab("signup")}
              id="auth-tab-signup"
              type="button"
              disabled={isLoginLoading || isSignupLoading}
            >
              Sign Up
            </button>
          </div>
        )}

        <Login 
          isActive={activeTab === "login"}
          isLoading={isLoginLoading}
          setIsLoading={setIsLoginLoading}
          redirectTo={redirectTo}
          onForgetPassword={handleForgetPassword}
          handleAuthFollowups={handleAuthSuccess}
        />

        <SignUp 
          isActive={activeTab === "signup"}
          isLoading={isSignupLoading}
          setIsLoading={setIsSignupLoading}
          redirectTo={redirectTo}
          handleAuthFollowups={handleAuthSuccess}

        />

        <ForgetPassword
          isActive={activeTab === "forget"}
          onBackToLogin={handleBackToLogin}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;