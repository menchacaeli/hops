import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import cheerio from 'cheerio-without-node-native';
import {post} from '../../../../helpers/fetchRequests';

export const getCumbreEvents = createAsyncThunk(
  'cumbre/getCumbreEvents',
  async () => {
    const searchUrl = 'https://www.lacumbrebrewing.com/';
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const eventsList = $('ul.eventon_events_list > div');
    let results = [];
    eventsList.map((_, event) => {
      let obj = {
        name: $('.evo_event_schema > span[itemprop="name"]', event).text(),
        image: $('.evo_event_schema > meta[itemprop="image"]', event).attr(
          'content',
        ),
        description: $(
          '.evo_event_schema > meta[itemprop="description"]',
          event,
        ).attr('content'),
        date: $('.evo_event_schema > meta[itemprop="startDate"]', event).attr(
          'content',
        ),
      };
      results.push(obj);
    });
    return results;
  },
);

export const cumbreSlice = createSlice({
  name: 'cumbre',
  initialState: {
    cumbreEvents: [],
    loading: 'idle',
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getCumbreEvents.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [getCumbreEvents.fulfilled]: (state, action) => {
      state.cumbreEvents = action.payload;
      state.loading = 'fulfilled';
    },
    [getCumbreEvents.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
  },
});

export default cumbreSlice.reducer;
