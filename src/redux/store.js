import { configureStore } from '@reduxjs/toolkit';

// Import reducers from the slices (assuming slice reducers are created)
import notesReducer from './slices/notesSlice';
import selectedNoteReducer from './slices/selectedNoteSlice';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        selectedNote: selectedNoteReducer,
    },
});
