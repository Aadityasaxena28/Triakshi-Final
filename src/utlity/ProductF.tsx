const Cart_Key = "gemstore_cart";

export const getGuestCart=()=>{
    return JSON.parse(localStorage.getItem(Cart_Key)||"[]");

};

export const saveGuestCart = (cart)=>{
    localStorage.setItem(Cart_Key,JSON.stringify(cart));
    return true;
}


export const clearGuestCart = () => {
  localStorage.removeItem(Cart_Key);
};

export const getGuestCartCount = ()=>{
    return JSON.parse(localStorage.getItem(Cart_Key)).length;
}