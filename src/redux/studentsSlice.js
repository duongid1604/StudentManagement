import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosClient from '../api/axiosClient';

const initialState = {
  loading: false,
  students: [],
  registeredSubject: [],
  error: '',
  nextPage: 1,
};

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (page = 1) => {
    const response = await AxiosClient.get(`students?page=${page}&limit=10`);
    return response.data;
  },
);

export const addStudents = createAsyncThunk(
  'students/addStudents',
  async body => {
    const response = await AxiosClient.post('students', body);
    return response.data;
  },
);
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ([id, body]) => {
    const response = await AxiosClient.patch(`students/${id}`, body);
    return response.data;
  },
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clear: state => {
      state.students = [];
      state.nextPage = 1;
    },
    loadMore: state => {
      state.nextPage += 1;
    },
    addSubject: (state, action) => {
      state.registeredSubject = [
        ...state.registeredSubject,
        ...action.payload.id,
      ];
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
