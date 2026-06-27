import { Bill, createBill } from "@/API/OrderAndBill";
import { getProfile, fetchGuestUser  } from "@/API/Profile";
import { CheckoutDraft } from "@/DataTypes/Checkout";
import { UserProfile } from "@/DataTypes/Profile";
import { toastError, toastInfo } from "@/utlity/AlertSystem";
import { getWithExpiry } from "@/utlity/Storage";
import { ChevronRight, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../General/Loader";
import CheckOut_Address from "./CheckOut_Address";
import Checkout_Contact from "./Checkout_Contact";

const currency = (v: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const BDK = import.meta.env.VITE_BUY_DRAFT_KEY;
  const baseUrl = import.meta.env.VITE_api_url || "http://localhost:5000";
  const isLoggedIn = !!localStorage.getItem("tg_token");

  const [currentStep, setCurrentStep] = useState<"contact" | "address" | "payment">("contact");
  const [loading, setLoading] = useState(false);

  // Contact
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(true);

  // Address
  const [fullName, setFullName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressErrors, setAddressErrors] = useState<Record<string, boolean>>({});

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "wallet" | "">("");

  // Draft
  const [draft, setDraft] = useState<CheckoutDraft | null>(null);
  const [source, setSource] = useState<"buy-now" | "cart">("buy-now");

  // User profile fetch (to prefill form)
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  function extractTenDigitsPhone(input?: string) {
    if (!input) return "";

    const digits = (input.match(/\d/g) || []).join("");
    // take last 10 if it looks like +91xxxxxxxxxx
    if (digits.length >= 10) return digits.slice(-10);
    return "";
  }

  useEffect(() => {
    let alive = true;

    async function loadProfile() {
      try {
        if (!isLoggedIn) {
          setUserLoading(false);
          setUserError(null);
          return;
        }

        const profile: UserProfile = await getProfile();
        if (!alive || !profile) return;

        // Contact
        const phone10 = extractTenDigitsPhone(profile.phone.toString());
        if (phone10) setMobileNumber(phone10);
        if (profile.email) setEmail(profile.email);

        // Address
        if (profile.name) setFullName(profile.name);
        if (profile.address) setAddressLine1(profile.address);
        if (profile.city) setCity(profile.city);
        if (profile.state) setState(profile.state);
        if (profile.zipcode) setPincode(profile.zipcode);

      } catch (err: any) {
        setUserError(err?.message || "Failed to load profile");
      } finally {
        if (alive) setUserLoading(false);
      }
    }

    loadProfile();
    return () => {
      alive = false;
    };
  }, [isLoggedIn]);

  // ====== Load items from either Buy-Now Draft OR Cart State ======
  useEffect(() => {
    const locationState = location.state as any;

    // Check if coming from cart
    if (locationState?.from === "cart" && locationState?.items) {
      setDraft({ items: locationState.items });
      setSource("cart");
    }
    // Otherwise check for buy-now draft
    else {
      // console.log("[CHECKOUT] Loading from Buy-Now draft");
      const d = getWithExpiry<CheckoutDraft>(BDK);
      // console.log("[CHECKOUT] Buy-now draft:", d);
      setDraft(d);
      setSource("buy-now");
    }
  }, [BDK, location.state]);

  // Derived pricing
  const { subTotal, discountTotal, shipping, tax, grandTotal } = useMemo(() => {
    const items = draft?.items || [];
    let sub = 0;
    let disc = 0;

    for (const it of items) {
      const qty = Math.max(1, Number(it.qty) || 1);
      const unit = Math.max(0, Number(it.unitPrice) || 0);
      const d = Math.min(100, Math.max(0, Number(it.discount) || 0));
      const discountedUnit = Math.round(unit * (1 - d / 100));

      sub += discountedUnit * qty;
      disc += Math.round(unit * qty - discountedUnit * qty);
    }

    // Free shipping for both buy-now and cart
    const shippingCost = items.length > 0 ? 0 : 0;
    const taxAmount = Math.round(sub * 0.03); // 3% GST
    // const grand = sub + shippingCost + taxAmount;
    const grand = sub + shippingCost;


    return { subTotal: sub, discountTotal: disc, shipping: shippingCost, tax: taxAmount, grandTotal: grand };
  }, [draft]);

  // ====== Step handlers ======
  const fetchAndLockGuestUser = async () => {
  const username = fullName.trim();

  if (!username) {
    toastError("Please enter your name.");
    return false;
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    toastError("Please enter a valid 10-digit mobile number.");
    return false;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    toastError("Please enter a valid email.");
    return false;
  }

  try {
    const payload = await fetchGuestUser({
      username,
      phonenumber: mobileNumber,
      email: email.trim(),
    });
    //console.log('Guest User  info',payload);
    if (!payload?.success || !payload?.user || !payload?.token) {
      toastError(payload?.message || "Failed to verify guest user.");
      return false;
    }
    toastInfo(payload?.message);
    localStorage.setItem("tg_guest_user", String(payload.user));
    
    return true;
  } catch (err: any) {
    console.error("Guest user fetch failed", err);
    toastError(err?.message || String(err) || "Failed to verify guest user.");
    return false;
  }
};
  const handleAddressContinue = async () => {
    // Validate address fields
    const errors: Record<string, boolean> = {};
    if (!fullName.trim()) errors.fullName = true;
    if (!addressLine1.trim()) errors.addressLine1 = true;
    if (!city.trim()) errors.city = true;
    if (!state.trim()) errors.state = true;
    if (!/^\d{6}$/.test(pincode)) errors.pincode = true;

    setAddressErrors(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    // Check if order has items
    if (!draft?.items?.length) {
      alert('Your order is empty.');
      return;
    }

    setLoading(true);
    
    try {
      if (!isLoggedIn) {
        const guestLocked = await fetchAndLockGuestUser();

        if (!guestLocked) {
          setLoading(false);
          return;
        }
      }
      const payload:Bill = {
        contact: { mobileNumber: `+91${mobileNumber}`, email, receiveUpdates },
        address: { fullName, addressLine1, addressLine2, city, state, pincode },
        order: {
          items: draft.items,
          subTotal,
          discountTotal,
          shipping,
          tax,
          grandTotal,
        },
        meta: { source },
      };

      const user = isLoggedIn? localStorage.getItem('tg_user'):localStorage.getItem('tg_guest_user');
      if (!user) {
        toastError("User not found for billing.");
        setLoading(false);
        return;
      }
      // const createJson = await createRes.json();
      const createRes =  await createBill(payload, user);

      const billId = createRes.billId;
      // console.log(billId)
      if (!billId) {
        throw new Error('Missing billId from server');
      }

      // 2) Ask backend for PayU params
      const checkoutRes = await fetch(`${baseUrl}/api/payment/payu-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId }),
        credentials: 'include',
      });

      const checkoutJson = await checkoutRes.json();

      if (!checkoutRes.ok) {
        throw new Error(checkoutJson.error || 'Failed to initialize PayU checkout');
      }

      // Backend should return payuUrl and payuParams
      const { payuUrl, payuParams } = checkoutJson;

      if (!payuUrl || !payuParams) {
        throw new Error('Invalid PayU response from server');
      }

      // Build a form and POST to PayU (auto-submit)
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = payuUrl;
      form.style.display = 'none';

      Object.keys(payuParams).forEach((k) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = k;
        input.value = String(payuParams[k] ?? '');
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err: any) {
      console.error('Checkout error', err);
      toastError(err?.message || String(err));
      setLoading(false);
    }
  };

  // const handlePaymentComplete = async () => {
  //   if (!paymentMethod) {
  //     alert("Please select a payment method");
  //     return;
  //   }

  //   if (!draft?.items?.length) {
  //     alert("Your order is empty.");
  //     return;
  //   }

  //   // Payload for backend
  //   const payload = {
  //     contact: { mobileNumber: `+91${mobileNumber}`, email, receiveUpdates },
  //     address: { fullName, addressLine1, addressLine2, city, state, pincode },
  //     payment: { method: paymentMethod },
  //     order: {
  //       items: draft.items,
  //       subTotal,
  //       discountTotal,
  //       shipping,
  //       tax,
  //       grandTotal,
  //     },
  //     meta: { source }, // "buy-now" or "cart"
  //   };

  //   console.log("PLACE ORDER payload ->", payload);

  //   // const response = await placeOrder(payload);

  //   // On success:
  //   if (source === "buy-now") {
  //     sessionStorage.removeItem(BDK); // Clear buy-now draft
  //   }
  //   // If from cart, you might want to call a clear cart API

  //   alert("Order placed successfully!");
  //   navigate("/home");
  // };

  // ====== Empty/Invalid draft UI ======
  if (!draft || !draft.items || draft.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your bag is empty</h2>
          <p className="text-gray-600 mb-6">
            {source === "cart"
              ? "Your cart is empty. Add some items to checkout!"
              : "Looks like you didn't add an item via Buy Now. Grab something shiny!"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/gemstones")}
              className="px-5 py-3 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
            >
              Browse Gemstones
            </button>
            <button
              onClick={() => navigate("/rudraksha")}
              className="px-5 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Rudraksha
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ====== Main Layout ======
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-yellow-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl flex gap-6">
        {/* Left Sidebar */}
        <div className="w-96 flex flex-col gap-4">
          {/* Brand */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">TG</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Triakshi Gems</h1>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">PayU Trusted Business</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Order summary
                {source === "cart" && (
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    ({draft.items.length} {draft.items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Items */}
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {draft.items.map((it, idx) => {
                const d = Math.min(100, Math.max(0, Number(it.discount) || 0));
                const unit = Math.max(0, Number(it.unitPrice) || 0);
                const discountedUnit = Math.round(unit * (1 - d / 100));
                return (
                  <div key={idx} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {it.image ? (
                        <img
                          src={`${it.image}`}
                          alt={it.name}
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{it.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Qty. {it.qty}</p>
                      {d > 0 && (
                        <p className="text-xs text-green-600 mt-0.5">{d}% off</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{currency(discountedUnit * it.qty)}</p>
                      {d > 0 && (
                        <p className="text-xs text-gray-400 line-through">₹{currency(unit * it.qty)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="mt-6 border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{currency(subTotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">- ₹{currency(discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">{shipping === 0 ? "Free" : `₹${currency(shipping)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (est.)</span>
                <span className="text-gray-900">₹{currency(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{currency(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white text-sm px-2">
            <span>Secured by</span>
            <span className="font-bold">PayU</span>
          </div>
        </div>

        {/* Right: Steps */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentStep === "contact" ? "bg-pink-50 text-pink-600" : "bg-green-50 text-green-600"
                }`}
              >
                {currentStep === "contact" ? "Contact" : "✓ Contact"}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentStep === "address"
                    ? "bg-pink-50 text-pink-600"
                    : currentStep === "payment"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-400"
                }`}
              >
                {currentStep === "payment" ? "✓ Address" : "Address"}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentStep === "payment" ? "bg-pink-50 text-pink-600" : "text-gray-400"
                }`}
              >
                Payment
              </span>
            </div>
          </div>

          {/* Loading State */}
          {(userLoading || loading) && (
            <div className="flex justify-center items-center py-12">
              <Loader />
            </div>
          )}

          {/* Error State */}
          {!userLoading && userError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{userError}</p>
            </div>
          )}

          {/* Contact Step */}
          {!userLoading && !loading && currentStep === "contact" && (
            <Checkout_Contact
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              email={email}
              setEmail={setEmail}
              receiveUpdates={receiveUpdates}
              setReceiveUpdates={setReceiveUpdates}
              setCurrentStep={setCurrentStep}
            />
          )}

          {/* Address Step */}
          {!userLoading && !loading && currentStep === "address" && (
            <CheckOut_Address
              fullName={fullName}
              setFullName={setFullName}
              addressLine1={addressLine1}
              setAddressLine1={setAddressLine1}
              addressLine2={addressLine2}
              setAddressLine2={setAddressLine2}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              pincode={pincode}
              setPincode={setPincode}
              setCurrentStep={setCurrentStep}
              handleAddressContinue={handleAddressContinue}
              addressErrors={addressErrors}
              setAddressErrors={setAddressErrors}
            />
          )}

          {/* Payment Step - if you have a payment form */}
          {/* {!loading && currentStep === "payment" && renderPaymentForm()} */}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Money Back Promise by
              </span>{" "}
              <span className="font-bold">PayU</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              By proceeding, I agree to PayU's{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Notice
              </a>{" "}
              •{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Edit Preferences
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}