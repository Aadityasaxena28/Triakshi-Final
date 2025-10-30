import { Login, Signup } from "@/API/Auth";
import { LoginData, SignupData } from "@/DataTypes/Auth";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Auth.css";

type props = {
  state: string;
};
type AuthLocationState = {
  from?: Location & { pathname?: string; search?: string; hash?: string };
} | null;
function safeRedirectPath(from?: Location): string {
  // Only allow same-app paths; ignore absolute URLs
  if (!from) return "/home";
  const pathname = from.pathname || "/home";
  const search = from.search || "";
  const hash = from.hash || "";
  
  return `${pathname}${search}${hash}`;
}

const Auth: React.FC<props> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const Navigate = useNavigate();
  const location = useLocation();
  const locState = (location.state as AuthLocationState) ?? null;
  const redirectTo = safeRedirectPath(locState?.from || undefined);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const phone = (document.getElementById("auth-loginPhone") as HTMLInputElement)?.value?.trim() || "";
  const password = (document.getElementById("auth-loginPassword") as HTMLInputElement)?.value || "";
  const country_code = (document.getElementById("auth-loginCountryCode") as HTMLInputElement)?.value || "+91";
  
  // basic validation
  if (!/^\d{10}$/.test(phone)) {
    toastError("Enter a valid 10-digit phone.");
    return;
  }
  if (!password) {
    toastError("Password is required.");
    return;
  }

  const payload: LoginData = {
    phonenumber: Number(phone),
    password,
  };

  setIsLoginLoading(true); // Start loading

  try {
    const res = await Login(payload);

    // success path
    if (res?.success) {
      // Persist session
      if (res.token) localStorage.setItem("tg_token", res.token);
      if (res.user) localStorage.setItem("tg_user", JSON.stringify(res.user));

      toastSuccess("Logged in successfully!");

      // Navigate to home
      Navigate(redirectTo, { replace: true });
    }
  } catch (err: any) {
    // err is now the error message string
    const errorMessage = typeof err === 'string' ? err : err?.message || "Login failed.";
    console.error("Login error:", errorMessage);
    toastError(errorMessage);
  } finally {
    setIsLoginLoading(false); // Stop loading
  }
};

const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const name = (document.getElementById("auth-signupName") as HTMLInputElement)?.value?.trim() || "";
  const phone = (document.getElementById("auth-signupPhone") as HTMLInputElement)?.value?.trim() || "";
  const email = (document.getElementById("auth-signupEmail") as HTMLInputElement)?.value?.trim() || "";
  const password = (document.getElementById("auth-signupPassword") as HTMLInputElement)?.value || "";
  const confirmPassword = (document.getElementById("auth-confirmPassword") as HTMLInputElement)?.value || "";
  const country_code = (document.getElementById("auth-signupCountryCode") as HTMLInputElement)?.value || "+91";
  
  if (!name) return toastError("Name is required.");
  if (!/^\d{10}$/.test(phone)) return toastError("Enter a valid 10-digit phone.");
  if (!/^\S+@\S+\.\S+$/.test(email)) return toastError("Enter a valid email.");
  if (password.length < 6) return toastError("Password must be at least 6 characters.");
  if (password !== confirmPassword) return toastError("Passwords do not match!");

  const payload: SignupData = {
    username: name,
    phonenumber: Number(phone),
    country_code: country_code,
    email,
    password,
  };

  setIsSignupLoading(true); // Start loading

  try {
    const res = await Signup(payload);

    if (res?.success) {
      // Store token and user in localStorage
      localStorage.setItem("tg_token", res.token);
      localStorage.setItem("tg_user", JSON.stringify(res.user));

      toastSuccess("Account created successfully!");
      Navigate(redirectTo, { replace: true });
    }
  } catch (err: any) {
    // err is now the error message string
    const errorMessage = typeof err === 'string' ? err : err?.message || "Signup failed.";
    console.error("Signup error:", errorMessage);
    toastError(errorMessage);
  } finally {
    setIsSignupLoading(false); // Stop loading
  }
};
  useEffect(() => {
    if (state === "login" || state === "signup") {
      setActiveTab(state);
    }
  }, [state]);

  return (
    <div className="auth_body">
      <div className="auth-container" id="auth-container">
        <div className="auth-logo" id="auth-logo">
          <h1>✦ TRIAKSHI GEMS ✦</h1>
          <p>
            ✨ Jai Maa Pitambara ✨
            <br />
            Welcome to <strong>Triakshi Gems</strong> – trusted for pure and authentic gemstones.
          </p>
        </div>

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

        {/* Login */}
        <div
          id="auth-loginForm"
          className={`auth-form-content ${activeTab === "login" ? "auth-active" : ""}`}
        >
          <form onSubmit={handleLogin} id="auth-loginForm-el">
            <div className="auth-form-group">
              <label htmlFor="auth-loginPhone" className="auth-label">
                Phone Number
              </label>
              <div className="auth-phone-input">
                <input
                  type="text"
                  className="auth-input auth-country-code"
                  placeholder="+91"

                  required
                  // readOnly
                  id="auth-loginCountryCode"
                />
                <input
                  type="tel"
                  id="auth-loginPhone"
                  className="auth-input"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]{10}"
                  disabled={isLoginLoading}
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="auth-loginPassword" className="auth-label">
                Password
              </label>
              <input
                type="password"
                id="auth-loginPassword"
                className="auth-input"
                placeholder="Enter your password"
                required
                disabled={isLoginLoading}
              />
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              id="auth-loginSubmit"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? (
                <>
                  <span className="auth-spinner"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="auth-forgot-link" id="auth-forgot">
              <a href="#auth-reset">Forgot Password?</a>
            </div>
          </form>
        </div>

        {/* Sign Up */}
        <div
          id="auth-signupForm"
          className={`auth-form-content ${activeTab === "signup" ? "auth-active" : ""}`}
        >
          <form onSubmit={handleSignup} id="auth-signupForm-el">
            <div className="auth-form-group">
              <label htmlFor="auth-signupName" className="auth-label">
                Full Name
              </label>
              <input
                type="text"
                id="auth-signupName"
                className="auth-input"
                placeholder="Enter your full name"
                required
                disabled={isSignupLoading}
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="auth-signupEmail" className="auth-label">
                Email
              </label>
              <input
                type="text"
                id="auth-signupEmail"
                className="auth-input"
                placeholder="ravi32@gmail.com"
                required
                disabled={isSignupLoading}
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="auth-signupPhone" className="auth-label">
                Phone Number
              </label>
              <div className="auth-phone-input">
                <input
                  type="text"
                  className="auth-input auth-country-code"
                  placeholder="+91"
                  id="auth-signupCountryCode"
                  disabled={isSignupLoading}
                  required
                />
                <input
                  type="tel"
                  id="auth-signupPhone"
                  className="auth-input"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]{10}"
                  disabled={isSignupLoading}
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="auth-signupPassword" className="auth-label">
                Password
              </label>
              <input
                type="password"
                id="auth-signupPassword"
                className="auth-input"
                placeholder="Create a password"
                required
                minLength={6}
                disabled={isSignupLoading}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="auth-confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="auth-confirmPassword"
                className="auth-input"
                placeholder="Confirm your password"
                required
                minLength={6}
                disabled={isSignupLoading}
              />
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              id="auth-signupSubmit"
              disabled={isSignupLoading}
            >
              {isSignupLoading ? (
                <>
                  <span className="auth-spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Auth;