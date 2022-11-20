import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  students: [],
  registerSubject: [],
  error: '',
  nextPage: 1,
};

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (page = 1) => {
    const response = await fetch(
      `https://6376f585b5f0e1eb8515e48d.mockapi.io/students/?page=${page}&limit=10`,
    );
    const data = await response.json();
    console.log('fetch');
    return data;
  },
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clear: state => {
      state.students = [];
    },
    loadMore: state => {
      state.nextPage += 1;
    },
    addSubject: (state, action) => {
      state.registerSubject = [...state.registerSubject, ...action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchStudents.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = [...state.students, ...action.payload];
      state.error = '';
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.students = [];
      state.error = action.error.message;
    });
  },
});

export const {clear, loadMore, addSubject} = studentsSlice.actions;

export default studentsSlice.reducer;
