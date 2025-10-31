import { getCartItems as fetchCartItems, updateCartItems } from "@/API/Cart";
import type { CartItemInfo } from "@/DataTypes/CartData";
import { toCheckoutItem } from "@/DataTypes/Checkout";
import { toastError } from "@/utlity/AlertSystem";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../General/Loader";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemInfo[]>([]);
  const baseUrl = import.meta.env.VITE_api_url;
  const navigate = useNavigate();
  
  // Track if cart was modified and store current items
  const cartModifiedRef = useRef(false);
  const initialCartRef = useRef<CartItemInfo[]>([]);
  const currentCartRef = useRef<CartItemInfo[]>([]); // Store latest cart state

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const res = await fetchCartItems();
      return res;
    },
  });

  // Set initial cart data
  useEffect(() => {
    if (data?.success && data?.items) {
      setCartItems(data.items);
      // Store initial state for comparison
      initialCartRef.current = JSON.parse(JSON.stringify(data.items));
      currentCartRef.current = data.items;
    }
  }, [data]);

  // Keep currentCartRef in sync with cartItems
  useEffect(() => {
    currentCartRef.current = cartItems;
  }, [cartItems]);

  // Update cart on component unmount
  useEffect(() => {
    return () => {
      // Cleanup function runs on unmount
      if (cartModifiedRef.current) {
        updateCartOnUnmount();
      }
    };
  }, []); // Empty dependency array means this only sets up the cleanup

  const updateCartOnUnmount = async () => {
    try {
      // Use the ref to get the latest cart items
      const currentItems = currentCartRef.current.map((item) => ({
        productId: item.productId,
        qty: item.qty || 0,
      }));

      // Call the update API
      await updateCartItems(currentItems);
      console.log("[CART] Updated cart on unmount", currentItems);
    } catch (error) {
      console.error("[CART] Failed to update cart on unmount:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      // Update cart before navigating
      if (cartModifiedRef.current) {
        const updateItems = cartItems.map((item) => ({
          productId: item.productId,
          qty: item.qty || 0,
        }));

        await updateCartItems(updateItems);
        cartModifiedRef.current = false; // Reset flag after successful update
      }

      const checkoutItems = cartItems.reduce((acc, item) => {
        if (item.qty && item.qty > 0) {
          acc.push(toCheckoutItem(item));
        }
        return acc;
      }, [] as ReturnType<typeof toCheckoutItem>[]);

      if (checkoutItems.length === 0) {
        toastError("Your cart is empty. Add items before checkout.");
        return;
      }

      navigate("/checkout", {
        state: {
          from: "cart",
          items: checkoutItems,
        },
      });
    } catch (error) {
      toastError(error);
    }
  };
  

  const updateQuantity = (productId: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;
        
        const newQty = Math.max(0, (item.qty ?? 0) + change);
        const qty = newQty;
        const unitPrice = item.unitPrice ?? 0;
        const discount = item.discount ?? 0;
        const effectivePrice =
          item.effectivePrice ?? Math.round(unitPrice * (1 - discount / 100));
        const lineTotal = effectivePrice * qty;

        // Mark cart as modified
        cartModifiedRef.current = true;

        return { ...item, qty, effectivePrice, lineTotal };
      })
    );
  };

  // Helper to check if cart was actually modified
  const hasCartChanged = () => {
    if (cartItems.length !== initialCartRef.current.length) return true;

    return cartItems.some((item, idx) => {
      const initial = initialCartRef.current[idx];
      return (
        item.productId !== initial.productId ||
        item.qty !== initial.qty
      );
    });
  };

  // Update the modified flag whenever cartItems changes
  useEffect(() => {
    if (initialCartRef.current.length > 0) {
      cartModifiedRef.current = hasCartChanged();
    }
  }, [cartItems]);

  // Calculate total
  const totalCart =
    data?.totalAmount ??
    cartItems.reduce((sum, item) => sum + (item.lineTotal ?? 0), 0);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Loader/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-red-600 font-semibold">
            {(error as Error)?.message || "Failed to load cart"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">Shopping Cart</h2>

        {!cartItems || cartItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Your cart is empty</div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) =>
                (item.qty ?? 0) > 0 ? (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-4 border-2 border-yellow-200 rounded-lg"
                  >
                    <img
                      src={`${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-yellow-600 font-semibold">
                        ₹{(item.effectivePrice ?? item.unitPrice ?? 0).toLocaleString()}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-gray-800 w-8 text-center">
                          {item.qty ?? 0}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-xl text-gray-800">
                        ₹{(item.lineTotal ?? 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : null
              )}
            </div>

            <div className="border-t-2 border-yellow-300 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-yellow-600">
                  ₹{(totalCart ?? 0).toLocaleString()}
                </span>
              </div>
              <button
                className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition"
                onClick={handleBuyNow}
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