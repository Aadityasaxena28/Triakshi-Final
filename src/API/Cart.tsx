import { CartItem } from "@/DataTypes/CartData";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { api } from "./Api";

// Local storage key for cart items
const CART_STORAGE_KEY = "guest_cart";

// Helper function to get cart from localStorage
const getLocalCart = (): CartItem[] => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

// Helper function to save cart to localStorage
const saveLocalCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

// Helper function to check if user is logged in
const isUserLoggedIn = (): boolean => {
  // Check if there's a token or user session
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");
  return !!token;
};

export async function addToCart(params: CartItem) {
  try {
    // If user is not logged in, store in localStorage
    if (!isUserLoggedIn()) {
      const localCart = getLocalCart();
      const existingItemIndex = localCart.findIndex(
        item => item.productId === params.productId
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        localCart[existingItemIndex].quantity += params.quantity;
      } else {
        // Add new item
        localCart.push(params);
      }

      saveLocalCart(localCart);
      return true;
    }

    // If user is logged in, use API
    const { data } = await api.post<any>(`/api/cart/add`, {
      ...params
    });
    if (!data.success) {
      throw new Error("Failed To Add Product To The Cart");
    }
    return data.success;
  } catch (error) {
    throw new Error(error || "Failed To Add Product");
  }
}

export async function getCartItems() {
  try {
    // If user is not logged in, get from localStorage
    if (!isUserLoggedIn()) {
      const localCart = getLocalCart();
      return {
        success: true,
        data: localCart,
        products: localCart
      };
    }

    // If user is logged in, use API
    const { data } = await api.get<any>("/api/cart/cart-products");
    if (!data.success) {
      throw new Error(data.error || "Failed To Fetch Cart Products");
    }
    return data;
  } catch (error) {
    throw new Error(error || "Failed To Fetch Cart Products");
  }
}

export async function updateCartItems(items: CartItem[]) {
  try {
    console.log(items);

    // If user is not logged in, update localStorage
    if (!isUserLoggedIn()) {
      saveLocalCart(items);
      toastSuccess("Cart updated successfully");
      return;
    }

    // If user is logged in, use API
    const { data } = await api.post("/api/cart/update", { items });
    if (!data?.success) {
      throw new Error(data?.error || "Failed to update cart");
    }
    toastSuccess(data.message);
    return;
  } catch (err: any) {
    toastError(err?.message || "Failed to update cart");
  }
}