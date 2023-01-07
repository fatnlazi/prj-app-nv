import {
  cardAreaViewSlice,
  safeAreaViewSlice,
  toolAreaViewSlice,
  cartAreaViewSlice,
  catalogueAreaViewSlice,
  cartSlice,
  catalogueSlice,
} from './slice';

export const {
  setCardAreaViewWidth,
  setCardAreaViewHeight,
  setCardAreaViewMargin,
  setCardAreaViewPadding,
} = cardAreaViewSlice.actions;

export const {
  setSafeAreaViewWidth,
  setSafeAreaViewHeight,
  setSafeAreaViewMargin,
  setSafeAreaViewPadding,
} = safeAreaViewSlice.actions;

export const {
  setToolAreaViewWidth,
  setToolAreaViewHeight,
  setToolAreaViewMargin,
  setToolAreaViewPadding,
} = toolAreaViewSlice.actions;

export const {
  setCartAreaViewWidth,
  setCartAreaViewHeight,
  setCartAreaViewMargin,
  setCartAreaViewPadding,
} = cartAreaViewSlice.actions;

export const {
  setCatalogueAreaViewWidth,
  setCatalogueAreaViewHeight,
  setCatalogueAreaViewMargin,
  setCatalogueAreaViewPadding,
  setCatalogueAreaViewNumOfColumns,
} = catalogueAreaViewSlice.actions;

export const { pushCart, popCart } = cartSlice.actions;

export const { setCatalogueText, setCatalogueImageUri, setCatalogueSoundUri } =
  catalogueSlice.actions;
