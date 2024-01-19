import { combineReducers } from 'redux';
import { ADD_NOTE, SELECT_NOTE } from './actions';

function notesReducer(state = [], action) {
    // Reducer logic here
}

function selectedNoteReducer(state = null, action) {
    // Reducer logic here
}

const rootReducer = combineReducers({
    notes: notesReducer,
    selectedNote: selectedNoteReducer
});

export default rootReducer;
