import { api } from "@/API/Api";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Auth.css";

export default function ResetPasswordPage() {
  const Navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (newPassword.length < 6) {
      toastError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toastError("Passwords do not match!");
      return;
    }

    if (!token || !email) {
      toastError("Invalid reset link. Please request a new one.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.put("/api/users/reset-password", { 
        email, 
        token, 
        newPassword 
      });

      if (res?.data?.success) {
        toastSuccess("Password reset successfully!");
        setPasswordReset(true);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          Navigate("/login", { replace: true });
        }, 2000);
      }
    } catch (err: any) {
      const errorMessage = typeof err === 'string' 
        ? err 
        : err?.response?.data?.message || err?.message || "Failed to reset password.";
      console.error("Reset password error:", errorMessage);
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    Navigate("/auth/login");
  };

  // Invalid token or email
  if (!token || !email) {
    return (
      <div className="auth_body">
        <div className="auth-container">
          <div className="auth-logo">
            <h1>✦ TRIAKSHI GEMS ✦</h1>
            <p>✨ Jai Maa Pitambara ✨</p>
          </div>

          <div className="auth-success-message">
            <div className="auth-success-icon" style={{ background: "#ef4444" }}>
              ✕
            </div>
            <h3>Invalid Reset Link</h3>
            <p className="auth-helper-text">
              This password reset link is invalid or has expired.
              <br />
              Please request a new password reset link.
            </p>

            <button
              type="button"
              onClick={handleBackToLogin}
              className="auth-submit-btn"
              style={{ marginTop: "1.5rem" }}
            >
              Back to Login
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="auth_body">
      <div className="auth-container">
        <div className="auth-logo">
          <h1>✦ TRIAKSHI GEMS ✦</h1>
          <p>
            ✨ Jai Maa Pitambara ✨
            <br />
            Create a new password for your account
          </p>
        </div>

        {!passwordReset ? (
          <div className="auth-form-content auth-active">
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="reset-email" className="auth-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="reset-email"
                  className="auth-input"
                  value={email}
                  disabled
                  style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="reset-newPassword" className="auth-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="reset-newPassword"
                  className="auth-input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="reset-confirmPassword" className="auth-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="reset-confirmPassword"
                  className="auth-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>

              <p className="auth-helper-text">
                Password must be at least 6 characters long.
              </p>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Set New Password"
                )}
              </button>

              <div className="auth-forgot-link">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="auth-text-btn"
                  disabled={loading}
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="auth-success-message">
            <div className="auth-success-icon">✓</div>
            <h3>Password Reset Successful!</h3>
            <p>Your password has been updated successfully.</p>
            <p className="auth-helper-text">
              Redirecting you to login...
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}