import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        addNote: (state, action) => {
            state.push({ ...action.payload, lastModified: new Date().toISOString() });
        },
        updateNoteContent: (state, action) => {
            const note = state.find(note => note.id === action.payload.id);
            if (note) {
                note.content = action.payload.content;
                note.lastModified = new Date().toISOString();
            }
        },
        deleteNote: (state, action) => {
            return state.filter(note => note.id !== action.payload);
        }
    },
});

export const { addNote, updateNoteContent, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
