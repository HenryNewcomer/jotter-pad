import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNote } from '../redux/slices/selectedNoteSlice'; // Action to select a note

const Tabs = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes); // Access notes from Redux store
    const selectedNote = useSelector((state) => state.selectedNote); // Access currently selected note

    const handleTabClick = (noteId) => {
        dispatch(selectNote(noteId)); // Dispatch action to update the selected note
    };

    return (
        <div className="tabs-container">
            {notes.map((note, index) => (
                <div key={index}
                    className={`tab-item ${selectedNote === note.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(note.id)}>
                    {note.title}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
