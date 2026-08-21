import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.size === action.payload.size &&
          i.color === action.payload.color
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; size: string; color: string; delta: number }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.size === action.payload.size &&
          i.color === action.payload.color
      );
      if (item) {
        const newQty = item.quantity + action.payload.delta;
        item.quantity = newQty > 0 ? newQty : 1;
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; size: string; color: string }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.id === action.payload.id &&
            i.size === action.payload.size &&
            i.color === action.payload.color
          )
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;