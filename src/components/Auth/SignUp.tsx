import { Signup as SignupAPI } from "@/API/Auth";
import { SignupData } from "@/DataTypes/Auth";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import React from "react";
import { useNavigate } from "react-router-dom";
import nban from "@/assets/newban.jpeg";

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
      className="auth-signup-wrapper"
      style={{
        backgroundImage: `url(${nban})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative'
      }}
    >
      {/* Overlay for better readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)'
      }} />
      
      <div
        id="auth-signupForm"
        className={`auth-form-content ${isActive ? "auth-active" : ""}`}
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            letterSpacing: '1px'
          }}>
            Triakshi Gems
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666',
            fontWeight: '400',
            lineHeight: '1.5'
          }}>
            Sign up to proceed and discover our exquisite collection of precious gems
          </p>
        </div>

        <form onSubmit={handleSignup} id="auth-signupForm-el">
          <div className="auth-form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="auth-signupName" className="auth-label" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#333'
            }}>
              Full Name
            </label>
            <input
              type="text"
              id="auth-signupName"
              className="auth-input"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            />
          </div>

          <div className="auth-form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="auth-signupEmail" className="auth-label" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#333'
            }}>
              Email
            </label>
            <input
              type="text"
              id="auth-signupEmail"
              className="auth-input"
              placeholder="ravi32@gmail.com"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            />
          </div>

          <div className="auth-form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="auth-signupPhone" className="auth-label" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#333'
            }}>
              Phone Number
            </label>
            <div className="auth-phone-input" style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="auth-input auth-country-code"
                placeholder="+91"
                id="auth-signupCountryCode"
                disabled={isLoading}
                required
                style={{
                  width: '80px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  textAlign: 'center'
                }}
              />
              <input
                type="tel"
                id="auth-signupPhone"
                className="auth-input"
                placeholder="Enter your phone number"
                required
                pattern="[0-9]{10}"
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div className="auth-form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="auth-signupPassword" className="auth-label" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#333'
            }}>
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
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            />
          </div>

          <div className="auth-form-group" style={{ marginBottom: '25px' }}>
            <label htmlFor="auth-confirmPassword" className="auth-label" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#333'
            }}>
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
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            id="auth-signupSubmit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#fff',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              opacity: isLoading ? 0.7 : 1
            }}
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

      <style>{`
        .auth-input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        .auth-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5) !important;
        }
        
        .auth-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .auth-form-content {
            padding: 30px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;