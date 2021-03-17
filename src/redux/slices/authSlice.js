import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../../helpers/fetchRequests';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (user) => {
  return post('auth/signin', user).then((response) => response.data);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: false,
    loading: 'idle',
    error: false,
    userName: '',
  },
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [fetchUser.fulfilled]: (state, {payload}) => {
      state.token = payload.user._id;
      state.loading = 'fulfilled';
      state.userName = payload.user.name;
    },
    [fetchUser.rejected]: (state, action) => {
      const {requestId} = action.meta;
      state.loading = 'rejected';
      state.error = true;
    },
  },
});

export default authSlice.reducer;
