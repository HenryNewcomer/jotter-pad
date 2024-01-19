import { createSlice } from '@reduxjs/toolkit';

export const selectedNoteSlice = createSlice({
    name: 'selectedNote',
    initialState: null,
    reducers: {
        selectNote: (state, action) => action.payload
    },
});

export const { selectNote } = selectedNoteSlice.actions;
export default selectedNoteSlice.reducer;
