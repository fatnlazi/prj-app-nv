import { createSlice } from '@reduxjs/toolkit';

export const cardAreaViewSlice = createSlice({
  name: 'cardAreaView',
  initialState: {
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
  },
  reducers: {
    setCardAreaViewWidth: (state, action) => {
      state.width = action.payload;
    },
    setCardAreaViewHeight: (state, action) => {
      state.height = action.payload;
    },
    setCardAreaViewMargin: (state, action) => {
      state.margin = action.payload;
    },
    setCardAreaViewPadding: (state, action) => {
      state.padding = action.payload;
    },
  },
});

export const safeAreaViewSlice = createSlice({
  name: 'safeAreaView',
  initialState: {
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
  },
  reducers: {
    setSafeAreaViewWidth: (state, action) => {
      state.width = action.payload;
    },
    setSafeAreaViewHeight: (state, action) => {
      state.height = action.payload;
    },
    setSafeAreaViewMargin: (state, action) => {
      state.margin = action.payload;
    },
    setSafeAreaViewPadding: (state, action) => {
      state.padding = action.payload;
    },
  },
});

export const toolAreaViewSlice = createSlice({
  name: 'toolAreaView',
  initialState: {
    width: 0,
    height: 0,
    margin: 4,
    padding: 0,
  },
  reducers: {
    setToolAreaViewWidth: (state, action) => {
      state.width = action.payload;
    },
    setToolAreaViewHeight: (state, action) => {
      state.height = action.payload;
    },
    setToolAreaViewMargin: (state, action) => {
      state.margin = action.payload;
    },
    setToolAreaViewPadding: (state, action) => {
      state.padding = action.payload;
    },
  },
});

export const cartAreaViewSlice = createSlice({
  name: 'cartAreaView',
  initialState: {
    width: 0,
    height: 0,
    margin: 4,
    padding: 0,
  },
  reducers: {
    setCartAreaViewWidth: (state, action) => {
      state.width = action.payload;
    },
    setCartAreaViewHeight: (state, action) => {
      state.height = action.payload;
    },
    setCartAreaViewMargin: (state, action) => {
      state.margin = action.payload;
    },
    setCartAreaViewPadding: (state, action) => {
      state.padding = action.payload;
    },
  },
});

export const catalogueAreaViewSlice = createSlice({
  name: 'catalogueAreaView',
  initialState: {
    width: 0,
    height: 0,
    margin: 4,
    padding: 0,
    numOfColumns: 0,
  },
  reducers: {
    setCatalogueAreaViewWidth: (state, action) => {
      state.width = action.payload;
    },
    setCatalogueAreaViewHeight: (state, action) => {
      state.height = action.payload;
    },
    setCatalogueAreaViewMargin: (state, action) => {
      state.margin = action.payload;
    },
    setCatalogueAreaViewPadding: (state, action) => {
      state.padding = action.payload;
    },
    setCatalogueAreaViewNumOfColumns: (state, action) => {
      state.numOfColumns = action.payload;
    },
  },
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list: [],
  },
  reducers: {
    pushCart: (state, action) => {
      state.list.push(action.payload);
    },
    popCart: (state) => {
      state.list.pop();
    },
  },
});

export const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState: {
    list: [
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
      { text: '', imageUri: '', soundUri: '' },
    ],
  },
  reducers: {
    setCatalogueText: (state, action) => {
      let index = action.payload.index;
      state.list[index].text = action.payload;
    },
    setCatalogueImageUri: (state, action) => {
      let index = action.payload.index;
      state.list[index].imageUri = action.payload;
    },
    setCatalogueSoundUri: (state, action) => {
      let index = action.payload.index;
      state.list[index].soundUri = action.payload;
    },
  },
});
