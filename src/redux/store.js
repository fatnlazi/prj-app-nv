import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  cardAreaViewSlice,
  safeAreaViewSlice,
  toolAreaViewSlice,
  cartAreaViewSlice,
  catalogueAreaViewSlice,
  cartSlice,
  catalogueSlice,
} from './slice';

export const store = configureStore({
  reducer: combineReducers({
    cardArea: cardAreaViewSlice.reducer,
    safeArea: safeAreaViewSlice.reducer,
    toolArea: toolAreaViewSlice.reducer,
    cartArea: cartAreaViewSlice.reducer,
    catalogueArea: catalogueAreaViewSlice.reducer,
    cart: cartSlice.reducer,
    catalogue: catalogueSlice.reducer,
  }),
});
