import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../../helpers/endPoints.js';
import {get} from '../../../helpers/fetchRequests';

export const getBeerFavorites = createAsyncThunk(
  'home/getBeerFavorites',
  async () => {
    return get(API.BEERFAVORITES).then((response) => response.data);
  },
);

export const getBreweryFavorites = createAsyncThunk(
  'home/getBreweryFavorites',
  async () => {
    return get(API.BREWERYFAVORITES).then((response) => response.data);
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    discoverItems: [
      {
        text: 'Upcoming Events & Releases',
        icon: 'calendar-alt',
        stack: 'Upcoming Events & Releases',
      },
      {
        text: 'Top Rated Beers',
        icon: 'beer',
        stack: 'Top Rated Beers',
      },
      {
        text: 'Top Rated Breweries',
        icon: 'warehouse',
        stack: 'Top Rated Breweries',
      },
    ],
    beerFavorites: [],
    breweryFavorites: [],
    beerloading: 'idle',
    beerError: false,
    breweryloading: 'idle',
    breweryError: false,
  },
  reducers: {},
  extraReducers: {
    [getBeerFavorites.pending]: (state, action) => {
      state.beerloading = 'pending';
    },
    [getBeerFavorites.fulfilled]: (state, {payload}) => {
      state.beerloading = 'fulfilled';
      state.beerFavorites = payload;
    },
    [getBeerFavorites.rejected]: (state, action) => {
      state.beerloading = 'rejected';
      state.beerError = true;
    },
    [getBreweryFavorites.pending]: (state, action) => {
      state.breweryloading = 'pending';
    },
    [getBreweryFavorites.fulfilled]: (state, {payload}) => {
      state.breweryloading = 'fulfilled';
      state.breweryFavorites = payload;
    },
    [getBreweryFavorites.rejected]: (state, action) => {
      state.breweryloading = 'rejected';
      state.breweryError = true;
    },
  },
});

export default homeSlice.reducer;
