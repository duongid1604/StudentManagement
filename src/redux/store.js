import {configureStore} from '@reduxjs/toolkit';
import studentsReducer from './studentsSlice';
import subjectsReducer from './subjectsSlice';
export default configureStore({
  reducer: {
    students: studentsReducer,
    subjects: subjectsReducer,
  },
});
