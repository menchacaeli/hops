import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../../../helpers/fetchRequests';
import {API} from '../../../../helpers/endPoints.js';

export const getTopRatedBreweries = createAsyncThunk(
  'topRatedBreweries/getTopRatedBreweries',
  async () => {
    return get(API.TOPRATEDBREWERIES).then((response) => response.data);
  },
);

export const topRatedBreweriesSlice = createSlice({
  name: 'topRatedBreweries',
  initialState: {
    topRatedBreweriesList: [],
    loading: 'idle',
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getTopRatedBreweries.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [getTopRatedBreweries.fulfilled]: (state, action) => {
      state.topRatedBreweriesList = action.payload;
      state.loading = 'fulfilled';
    },
    [getTopRatedBreweries.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
  },
});

export default topRatedBreweriesSlice.reducer;
