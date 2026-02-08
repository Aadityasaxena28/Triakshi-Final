import { Signup as SignupAPI } from "@/API/Auth";
import { SignupData } from "@/DataTypes/Auth";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import React from "react";
import { useNavigate } from "react-router-dom";

type SignupProps = {
  isActive: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  redirectTo: string;
};

const SignUp: React.FC<SignupProps> = ({ isActive, isLoading, setIsLoading, redirectTo }) => {
  const Navigate = useNavigate();

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

    setIsLoading(true);

    try {
      const res = await SignupAPI(payload);

      if (res?.success) {
        localStorage.setItem("tg_token", res.token);
        localStorage.setItem("tg_user", JSON.stringify(res.user));

        toastSuccess("Account created successfully!");
        Navigate(redirectTo, { replace: true });
      }
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : err?.message || "Signup failed.";
      console.error("Signup error:", errorMessage);
      toastError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="auth-signupForm"
      className={`auth-form-content ${isActive ? "auth-active" : ""}`}
      style={{ backgroundColor: 'transparent' }}
    >
      <form onSubmit={handleSignup} id="auth-signupForm-el">
        <div className="auth-form-group">
          <label htmlFor="auth-signupName" className="auth-label" style={{ color: '#FFD700' }}>
            Full Name
          </label>
          <input
            type="text"
            id="auth-signupName"
            className="auth-input"
            placeholder="Enter your full name"
            required
            disabled={isLoading}
            style={{ color: '#FFD700' }}
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="auth-signupEmail" className="auth-label" style={{ color: '#FFD700' }}>
            Email
          </label>
          <input
            type="text"
            id="auth-signupEmail"
            className="auth-input"
            placeholder="ravi32@gmail.com"
            required
            disabled={isLoading}
            style={{ color: '#FFD700' }}
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="auth-signupPhone" className="auth-label" style={{ color: '#FFD700' }}>
            Phone Number
          </label>
          <div className="auth-phone-input">
            <input
              type="text"
              className="auth-input auth-country-code"
              placeholder="+91"
              id="auth-signupCountryCode"
              disabled={isLoading}
              required
              style={{ color: '#FFD700' }}
            />
            <input
              type="tel"
              id="auth-signupPhone"
              className="auth-input"
              placeholder="Enter your phone number"
              required
              pattern="[0-9]{10}"
              disabled={isLoading}
              style={{ color: '#FFD700' }}
            />
          </div>
        </div>

        <div className="auth-form-group">
          <label htmlFor="auth-signupPassword" className="auth-label" style={{ color: '#FFD700' }}>
            Password
          </label>
          <input
            type="password"
            id="auth-signupPassword"
            className="auth-input"
            placeholder="Create a password"
            required
            minLength={6}
            disabled={isLoading}
            style={{ color: '#FFD700' }}
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="auth-confirmPassword" className="auth-label" style={{ color: '#FFD700' }}>
            Confirm Password
          </label>
          <input
            type="password"
            id="auth-confirmPassword"
            className="auth-input"
            placeholder="Confirm your password"
            required
            minLength={6}
            disabled={isLoading}
            style={{ color: '#FFD700' }}
          />
        </div>

        <button
          type="submit"
          className="auth-submit-btn"
          id="auth-signupSubmit"
          disabled={isLoading}
          style={{ color: '#FFD700' }}
        >
          {isLoading ? (
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
  );
};

export default SignUp;