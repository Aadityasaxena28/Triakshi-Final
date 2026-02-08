import { getCartItems as fetchCartItems, updateCartItems } from "@/API/Cart";
import type { CartItemInfo } from "@/DataTypes/CartData";
import { toCheckoutItem } from "@/DataTypes/Checkout";
import { toastError } from "@/utlity/AlertSystem";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../General/Loader";
import { getGuestCart } from "@/utlity/ProductF";

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("tg_token");

  /* ---------------- STATE ---------------- */
  const [cartItems, setCartItems] = useState<CartItemInfo[]>(getGuestCart());

  /* ---------------- REFS ---------------- */
  const cartModifiedRef = useRef(false);
  const initialCartRef = useRef<CartItemInfo[]>([]);
  const currentCartRef = useRef<CartItemInfo[]>(cartItems);

  /* ---------------- QUERY ---------------- */
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart-items", isLoggedIn],
    queryFn: fetchCartItems,
    enabled: isLoggedIn,
  });

  /* ---------------- EFFECTS ---------------- */

  // Sync backend cart → state (ONLY when logged in)
  useEffect(() => {
    if (data?.success && Array.isArray(data.items)) {
      setCartItems(data.items);
      console.log(data.items);
      // Deep copy to prevent mutation bugs
      initialCartRef.current = JSON.parse(JSON.stringify(data.items));
      currentCartRef.current = data.items;
    }
  }, [data]);

  // Keep latest cart in ref
  useEffect(() => {
    currentCartRef.current = cartItems;
  }, [cartItems]);

  // Update backend cart on unmount
  useEffect(() => {
    return () => {
      if (isLoggedIn && cartModifiedRef.current) {
        updateCartOnUnmount();
      }
    };
  }, [isLoggedIn]);

  /* ---------------- HELPERS ---------------- */

  const updateCartOnUnmount = async () => {
    try {
      const payload = currentCartRef.current.map(item => ({
        productId: item.productId,
        qty: item.qty ?? 0,
      }));

      await updateCartItems(payload);
      cartModifiedRef.current = false;
    } catch (err) {
      console.error("[CART] Unmount sync failed", err);
    }
  };

  const hasCartChanged = () => {
    const initialMap = new Map(
      initialCartRef.current.map(i => [i.productId, i.qty])
    );

    return cartItems.some(item => {
      return initialMap.get(item.productId) !== item.qty;
    });
  };

  /* ---------------- CART ACTIONS ---------------- */

  const updateQuantity = (productId: string, change: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.productId !== productId) return item;

        const qty = Math.max(0, (item.qty ?? 0) + change);
        const unitPrice = item.unitPrice ?? 0;
        const discount = item.discount ?? 0;
        const effectivePrice =
          item.effectivePrice ?? Math.round(unitPrice * (1 - discount / 100));
        const lineTotal = effectivePrice * qty;

        cartModifiedRef.current = true;

        return { ...item, qty, effectivePrice, lineTotal };
      })
    );
  };

  const handleBuyNow = async () => {
    try {
      if (isLoggedIn && cartModifiedRef.current) {
        const payload = cartItems.map(item => ({
          productId: item.productId,
          qty: item.qty ?? 0,
        }));

        await updateCartItems(payload);
        cartModifiedRef.current = false;
      }

      const checkoutItems = cartItems
        .filter(item => (item.qty ?? 0) > 0)
        .map(toCheckoutItem);

      if (checkoutItems.length === 0) {
        toastError("Your cart is empty.");
        return;
      }

      navigate("/checkout", {
        state: { from: "cart", items: checkoutItems },
      });
    } catch (err) {
      toastError("Failed to proceed to checkout");
    }
  };

  /* ---------------- CART CHANGE TRACKER ---------------- */

  useEffect(() => {
    if (initialCartRef.current.length > 0) {
      cartModifiedRef.current = hasCartChanged();
    }
  }, [cartItems]);

  /* ---------------- TOTAL (FIXED) ---------------- */

  const totalCart = cartItems.reduce(
    (sum, item) => sum + (item.lineTotal ?? 0),
    0
  );

  /* ---------------- UI ---------------- */

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto text-red-600">
        {(error as Error)?.message || "Failed to load cart"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map(item =>
                (item.qty ?? 0) > 0 ? (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-4 border-2 border-yellow-200 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-yellow-600 font-semibold">
                        ₹{(item.effectivePrice ?? item.unitPrice ?? 0).toLocaleString()}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="w-8 h-8 bg-yellow-500 text-white rounded-full"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-8 text-center font-semibold">
                          {item.qty ?? 0}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="w-8 h-8 bg-yellow-500 text-white rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-bold text-xl">
                      ₹{(item.lineTotal ?? 0).toLocaleString()}
                    </div>
                  </div>
                ) : null
              )}
            </div>

            <div className="border-t-2 border-yellow-300 pt-6">
              <div className="flex justify-between mb-6">
                <span className="text-2xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-yellow-600">
                  ₹{totalCart.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold hover:bg-yellow-600"
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
