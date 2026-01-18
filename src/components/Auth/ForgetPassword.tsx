import { ForgetPasswordAPI } from "@/API/Auth";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import React, { useState } from "react";

type ForgetPasswordProps = {
  isActive: boolean;
  onBackToLogin: () => void;
};

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ isActive, onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (document.getElementById("auth-forgetEmail") as HTMLInputElement)?.value?.trim() || "";
    
    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toastError("Enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await ForgetPasswordAPI( email );

      if (res?.success) {
        toastSuccess("Password reset link sent to your email!");
        setEmailSent(true);
        
        // Reset form after 3 seconds and go back to login
        setTimeout(() => {
          setEmailSent(false);
          onBackToLogin();
        }, 3000);
      }
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : err?.message || "Failed to send reset link.";
      console.error("Forget password error:", errorMessage);
      toastError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="auth-forgetForm"
      className={`auth-form-content ${isActive ? "auth-active" : ""}`}
    >
      {!emailSent ? (
        <form onSubmit={handleForgetPassword} id="auth-forgetForm-el">
          <div className="auth-form-group">
            <label htmlFor="auth-forgetEmail" className="auth-label">
              Email Address
            </label>
            <input
              type="email"
              id="auth-forgetEmail"
              className="auth-input"
              placeholder="Enter your registered email"
              required
              disabled={isLoading}
            />
          </div>

          <p className="auth-helper-text">
            We'll send you a password reset link to your email address.
          </p>

          <button
            type="submit"
            className="auth-submit-btn"
            id="auth-forgetSubmit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="auth-spinner"></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <div className="auth-forgot-link" id="auth-backToLogin">
            <button 
              type="button"
              onClick={onBackToLogin}
              className="auth-text-btn"
              disabled={isLoading}
            >
              ← Back to Login
            </button>
          </div>
        </form>
      ) : (
        <div className="auth-success-message">
          <div className="auth-success-icon">✓</div>
          <h3>Check Your Email</h3>
          <p>We've sent a password reset link to your email address.</p>
          <p className="auth-helper-text">
            Redirecting you back to login...
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
