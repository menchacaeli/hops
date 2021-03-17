import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../../helpers/endPoints.js';
import {get, put} from '../../../helpers/fetchRequests';

export const getBreweries = createAsyncThunk(
  'breweries/getBreweries',
  async () => {
    return get(API.BREWERIES).then((response) => response.data);
  },
);

export const removeBreweryFromFavs = createAsyncThunk(
  'breweries/removeBreweryFromFavs',
  async (id) => {
    return put(API.BREWERIES + id, {isFavorite: false}).then(
      (response) => response,
    );
  },
);

export const addBreweryToFavs = createAsyncThunk(
  'breweries/addBreweryToFavs',
  async (id) => {
    return put(API.BREWERIES + id, {isFavorite: true}).then(
      (response) => response,
    );
  },
);

export const breweriesSlice = createSlice({
  name: 'breweries',
  initialState: {
    breweries: [],
    loading: 'idle',
    error: false,
    removeloading: 'idle',
    removeError: false,
    addloading: 'idle',
    addError: false,
  },
  reducers: {},
  extraReducers: {
    [getBreweries.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [getBreweries.fulfilled]: (state, {payload}) => {
      state.loading = 'fulfilled';
      state.breweries = payload;
    },
    [getBreweries.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
    [removeBreweryFromFavs.pending]: (state, action) => {
      state.removeloading = 'pending';
    },
    [removeBreweryFromFavs.fulfilled]: (state, action) => {
      state.removeloading = 'fulfilled';
    },
    [removeBreweryFromFavs.rejected]: (state, action) => {
      state.removeloading = 'rejected';
      state.removeError = true;
    },
    [addBreweryToFavs.pending]: (state, action) => {
      state.addloading = 'pending';
    },
    [addBreweryToFavs.fulfilled]: (state, action) => {
      state.addloading = 'fulfilled';
    },
    [addBreweryToFavs.rejected]: (state, action) => {
      state.addloading = 'rejected';
      state.addError = true;
    },
  },
});

export default breweriesSlice.reducer;
