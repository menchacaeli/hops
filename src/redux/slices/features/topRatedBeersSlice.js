import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import cheerio from 'cheerio-without-node-native';
import {get} from '../../../../helpers/fetchRequests';
import {API} from '../../../../helpers/endPoints.js';

export const getTopRatedBeers = createAsyncThunk(
  'topRatedBeers/getTopRatedBeers',
  async () => {
    return get(API.TOPRATEDBEERS).then((response) => response.data);
  },
);

export const topRatedBeersSlice = createSlice({
  name: 'topRatedBeers',
  initialState: {
    topRatedBeersList: [],
    loading: 'idle',
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getTopRatedBeers.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [getTopRatedBeers.fulfilled]: (state, action) => {
      state.topRatedBeersList = action.payload;
      state.loading = 'fulfilled';
    },
    [getTopRatedBeers.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
  },
});

export default topRatedBeersSlice.reducer;
