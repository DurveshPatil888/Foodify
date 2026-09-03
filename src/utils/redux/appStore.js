import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: {
    cart: loadCartFromStorage(),
  },
});

appStore.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(appStore.getState().cart));
});

export default appStore;
