import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice.js';
import authSlice from './slices/authSlice.js';
import homeSlice from './slices/homeSlice.js';
import beersSlice from './slices/beersSlice.js';
import breweriesSlice from './slices/breweriesSlice.js';
import cumbreSlice from './slices/features/cumbreSlice.js';
import marbleSlice from './slices/features/marbleSlice.js';
import topRatedBeersSlice from './slices/features/topRatedBeersSlice.js';
import topRatedBreweriesSlice from './slices/features/topRatedBreweriesSlice.js';
import starRatingSlice from './slices/features/starRatingSlice.js';

export default configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    home: homeSlice,
    beers: beersSlice,
    breweries: breweriesSlice,
    cumbre: cumbreSlice,
    marble: marbleSlice,
    topRatedBeers: topRatedBeersSlice,
    topRatedBreweries: topRatedBreweriesSlice,
    starRating: starRatingSlice,
  },
});
