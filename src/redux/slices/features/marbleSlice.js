import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import cheerio from 'cheerio-without-node-native';
import {post} from '../../../../helpers/fetchRequests';

export const getMarbleEvents = createAsyncThunk(
  'marble/getMarbleEvents',
  async () => {
    const searchUrl = 'https://marblebrewery.com/events';
    const response = await fetch(searchUrl);

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const eventsList = $('#events > div');
    let results = [];
    eventsList.map((_, event) => {
      let obj = {
        name: $('.offsiteEvent h2', event).text(),
        image: $('.offsiteEvent img', event).attr('src'),
        description: $('.offsiteEvent p', event).text(),
        date: $('.offsiteEvent h3', event).text(),
      };
      results.push(obj);
    });
    return results;
  },
);

export const marbleSlice = createSlice({
  name: 'marble',
  initialState: {
    marbleEvents: [],
    loading: 'idle',
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getMarbleEvents.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [getMarbleEvents.fulfilled]: (state, action) => {
      state.marbleEvents = action.payload;
      state.loading = 'fulfilled';
    },
    [getMarbleEvents.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
  },
});

export default marbleSlice.reducer;
