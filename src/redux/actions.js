// Action Types
export const ADD_NOTE = 'ADD_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';

// Action Creators
export function addNote(note) {
    return { type: ADD_NOTE, payload: note };
}

export function selectNote(noteId) {
    return { type: SELECT_NOTE, payload: noteId };
}
