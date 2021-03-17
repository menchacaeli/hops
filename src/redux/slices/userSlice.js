import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../../helpers/fetchRequests';

export const createUser = createAsyncThunk('user/createUser', async (user) => {
  return post('/api/users/create', user).then((response) => response.data);
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    password: '',
    loading: 'idle',
    error: false,
  },
  reducers: {},
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = 'fulfilled';
    },
    [createUser.rejected]: (state, action) => {
      state.loading = 'rejected';
      state.error = true;
    },
  },
});

export default userSlice.reducer;
