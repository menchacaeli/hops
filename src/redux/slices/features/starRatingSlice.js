import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../../../helpers/endPoints.js';
import {put} from '../../../../helpers/fetchRequests';

export const getStarRating = createAsyncThunk(
  'starRating/getStarRating',
  async (model) => {
    const URL = model.type === 'beers' ? API.BEERS : API.BREWERIES;
    return put(URL + model.id, {rating: model.rating}).then(
      (response) => response,
    );
  },
);

export const starRatingSlice = createSlice({
  name: 'starRating',
  initialState: {
    loading: 'idle',
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getStarRating.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [getStarRating.fulfilled]: (state, action) => {
      state.loading = 'fulfilled';
    },
    [getStarRating.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
  },
});

export default starRatingSlice.reducer;
