import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosClient from '../api/axiosClient';

const initialState = {
  loading: false,
  subjects: [],
  error: '',
};

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async () => {
    const response = await AxiosClient.get('subject');
    return response.data;
  },
);

export const addSubject = createAsyncThunk(
  'students/addSubject',
  async body => {
    const response = await AxiosClient.post('subject', body);
    return response.data;
  },
);

export const updateSubject = createAsyncThunk(
  'students/updateSubject',
  async ([id, body]) => {
    const response = await AxiosClient.patch(`subject/${id}`, body);
    return response.data;
  },
);

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    // removeSubject: (state, action) => {
    //   return state.subjects.filter(item => item.id !== action.payload.id);
    // },
  },
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

export const {removeSubject} = subjectsSlice.actions;

export default subjectsSlice.reducer;
