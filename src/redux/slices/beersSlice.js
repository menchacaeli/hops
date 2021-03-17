import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../../helpers/endPoints.js';
import {get, put} from '../../../helpers/fetchRequests';

export const getBeers = createAsyncThunk('beers/getBeers', async () => {
  return get(API.BEERS).then((response) => response.data);
});

export const removeBeerFromFavs = createAsyncThunk(
  'beers/removeBeerFromFavs',
  async (id) => {
    return put(API.BEERS + id, {isFavorite: false}).then(
      (response) => response,
    );
  },
);

export const addBeerToFavs = createAsyncThunk(
  'beers/addBeerToFavs',
  async (id) => {
    return put(API.BEERS + id, {isFavorite: true}).then((response) => response);
  },
);

export const homeSlice = createSlice({
  name: 'beers',
  initialState: {
    beers: [],
    loading: 'idle',
    error: false,
    removeloading: 'idle',
    removeError: false,
    addloading: 'idle',
    addError: false,
    starloading: 'idle',
    starError: false,
  },
  reducers: {},
  extraReducers: {
    [getBeers.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [getBeers.fulfilled]: (state, {payload}) => {
      state.loading = 'fulfilled';
      state.beers = payload;
    },
    [getBeers.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
    [removeBeerFromFavs.pending]: (state, action) => {
      state.removeloading = 'pending';
    },
    [removeBeerFromFavs.fulfilled]: (state, action) => {
      state.removeloading = 'fulfilled';
    },
    [removeBeerFromFavs.rejected]: (state, action) => {
      state.removeloading = 'rejected';
      state.removeError = true;
    },
    [addBeerToFavs.pending]: (state, action) => {
      state.addloading = 'pending';
    },
    [addBeerToFavs.fulfilled]: (state, action) => {
      state.addloading = 'fulfilled';
    },
    [addBeerToFavs.rejected]: (state, action) => {
      state.addloading = 'rejected';
      state.addError = true;
    },
  },
});

export default homeSlice.reducer;
