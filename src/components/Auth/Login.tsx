import { Login as LoginAPI } from "@/API/Auth";
import { LoginData } from "@/DataTypes/Auth";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import React from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  isActive: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  redirectTo: string;
  onForgetPassword: () => void;
};

const Login: React.FC<LoginProps> = ({ isActive, isLoading, setIsLoading, redirectTo, onForgetPassword }) => {
  const Navigate = useNavigate();

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

    setIsLoading(true);

    try {
      const res = await LoginAPI(payload);

      if (res?.success) {
        // Persist session
        if (res.token) localStorage.setItem("tg_token", res.token);
        if (res.user) localStorage.setItem("tg_user", JSON.stringify(res.user));

        toastSuccess("Logged in successfully!");
        Navigate(redirectTo, { replace: true });
      }
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : err?.message || "Login failed.";
      console.error("Login error:", errorMessage);
      toastError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="auth-loginForm"
      className={`auth-form-content ${isActive ? "auth-active" : ""}`}
      style={{ backgroundColor: 'transparent' }}
    >
      <form onSubmit={handleLogin} id="auth-loginForm-el">
        <div className="auth-form-group">
          <label htmlFor="auth-loginPhone" className="auth-label" style={{ color: '#FFD700' }}>
            Phone Number
          </label>
          <div className="auth-phone-input">
            <input
              type="text"
              className="auth-input auth-country-code"
              placeholder="+91"
              required
              id="auth-loginCountryCode"
              style={{ color: '#FFD700' }}
            />
            <input
              type="tel"
              id="auth-loginPhone"
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
          <label htmlFor="auth-loginPassword" className="auth-label" style={{ color: '#FFD700' }}>
            Password
          </label>
          <input
            type="password"
            id="auth-loginPassword"
            className="auth-input"
            placeholder="Enter your password"
            required
            disabled={isLoading}
            style={{ color: '#FFD700' }}
          />
        </div>

        <button
          type="submit"
          className="auth-submit-btn"
          id="auth-loginSubmit"
          disabled={isLoading}
          style={{ color: '#FFD700' }}
        >
          {isLoading ? (
            <>
              <span className="auth-spinner"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="auth-forgot-link" id="auth-forgot">
          <button 
            type="button"
            onClick={onForgetPassword}
            className="auth-text-btn"
            disabled={isLoading}
            style={{ color: '#FFD700' }}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;