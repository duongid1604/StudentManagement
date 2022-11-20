import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  subjects: [],
  error: '',
};

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async () => {
    const response = await fetch(
      'https://6376f585b5f0e1eb8515e48d.mockapi.io/subject/',
    );
    const data = await response.json();
    return data;
  },
);

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSubjects.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      state.loading = false;
      state.subjects = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSubjects.rejected, (state, action) => {
      state.loading = false;
      state.subjects = [];
      state.error = action.error.message;
    });
  },
});

export default subjectsSlice.reducer;
