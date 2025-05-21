import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/CustomerSlice';

// Load persisted customer info from localStorage
const persistedCustomerInfo = localStorage.getItem('customerInfo')
  ? JSON.parse(localStorage.getItem('customerInfo'))
  : null;

const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
  preloadedState: {
    customer: {
      customerInfo: persistedCustomerInfo,
      isLoggedIn: !!persistedCustomerInfo,
    },
  },
});

export default store;
